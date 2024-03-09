import express from "express";
import prisma from "../db/prisma";
const stripe = require("stripe")(process.env.STRIPE_SECRET);
import crypto from "crypto";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  Stock: number;
  quantity: number;
};

export const getAllProducts = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const products = await prisma?.product.findMany();
    res.status(200).json(products);
  } catch (error) {
    return res.sendStatus(400);
  }
};

export const addToCart = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { productId, quantity, userId } = req.body;

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return res.status(400).json({ error: "Product not found" });
    }

    const isProdExistsInCart = await prisma.cartItem.findFirst({
      where: {
        productId: product.id,
      },
    });

    if (isProdExistsInCart) {
      await prisma.cartItem.update({
        where: {
          id: isProdExistsInCart.id,
        },
        data: {
          quantity: isProdExistsInCart.quantity + 1,
          totalPrice: (isProdExistsInCart.quantity + 1) * product.price,
        },
      });

      return res.status(200).json({ message: "Product is already is in Cart" });
    } else {
      const cartItem =
        product &&
        (await prisma.cartItem.create({
          data: {
            productId: product?.id,
            quantity: quantity,
            totalPrice: quantity * product?.price,
            userId: userId,
          },
        }));

      return res.status(201).json({
        message: "Product added to Cart successfully",
        data: cartItem,
      });
    }
  } catch (error) {
    return res.sendStatus(400);
  }
};

export const getAllCartItems = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const cartItems = await prisma.cartItem.findMany({
      select: {
        product: true,
        quantity: true,
        totalPrice: true,
        user: true,
      },
    });

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: "No Product in Cart" });
    }

    return res
      .status(200)
      .json({ message: "CartItems fetched successfully", data: cartItems });
  } catch (error) {
    return res.sendStatus(400);
  }
};

const getActiveProducts = async () => {
  const checkProducts = await stripe.products.list();
  const availableProducts = checkProducts.data.filter(
    (product: any) => product.active === true
  );
  return availableProducts;
};

const createSignature = (message: string) => {
  const secret = process.env.SIGNATURE_SECRET!;

  // create a HMAC-SHA356 hash
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(message);

  // get the digest in base64 format
  const hasnInBase64 = hmac.digest("base64");
  return hasnInBase64;
};

export const createOrder = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { updatedData: cartData, paymentMethod } = req.body;

    if (!cartData || cartData.length === 0) {
      return res
        .status(400)
        .json({ message: "Add Products to Cart to Checkout" });
    }

    if (cartData) {
      const Actualdata = cartData.map((transactionData: any) => ({
        amount: transactionData.amount,
        paymentStatus: transactionData.paymentStatus,
        customerId: transactionData.customerId,
        productId: transactionData.productId,
        quantity: transactionData.quantity,
        paymentMethod: paymentMethod,
      }));

      // await prisma.transaction.createMany({ data: data });
      for (let data of Actualdata) {
        await prisma.transaction.create({
          data: data,
        });
      }
    }

    res.status(200).json({ message: "Transactions added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Please Try again later" });
  }
};

export const confirmCheckout = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { products } = req.body;
    const data: Product[] = products;

    let activeProducts = await getActiveProducts();

    try {
      for (const product of data) {
        const stripeProduct = activeProducts?.find(
          (stripeProduct: any) =>
            stripeProduct?.name?.toLowerCase() == product?.name?.toLowerCase()
        );

        if (stripeProduct == undefined || !stripeProduct) {
          await stripe.products.create({
            name: product.name,
            default_price_data: {
              unit_amount: product.price * 100,
              currency: "usd",
            },
          });
        }
      }
    } catch (error) {
      return res.status(400).json({ error: "Error on creating a new product" });
    }

    activeProducts = await getActiveProducts();
    let stripeItems: any = [];

    for (const product of data) {
      const stripeProduct = activeProducts?.find(
        (prod: any) => prod?.name?.toLowerCase() == product?.name?.toLowerCase()
      );

      if (stripeProduct) {
        stripeItems.push({
          price: stripeProduct?.default_price,
          quantity: product?.quantity,
        });
      }
    }

    const session = await stripe.checkout.sessions.create({
      line_items: stripeItems,
      mode: "payment",
      submit_type: "pay",
      payment_method_types: ["card"],
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    return res.sendStatus(400);
  }
};
