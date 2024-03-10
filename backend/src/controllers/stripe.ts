const stripe = require("stripe")(process.env.STRIPE_SECRET);
import express from "express";
import { Customer, Data } from "../../types";
import { Product } from "@prisma/client";

let endpointSecret: string;
endpointSecret =
  "whsec_1bd19c861a0006813e740af6aecec5559bac486af546718d9c22f6c477b140ba";

export const createTransaction = async (customer: Customer, data: Data) => {
  try {
    const Items = JSON.parse(customer.metadata.cart);

    // Retrieve product IDs from the Items array
    const productIds = Items.map((item: any) => item.productId);

    // Fetch products from the database based on the retrieved IDs
    let products = (await prisma?.product.findMany({
      where: {
        id: { in: productIds },
      },
    })) as Product[];

    if (products && products.length !== 0) {
      const newTransaction = await prisma?.transaction.create({
        data: {
          userId: customer.metadata.userId,
          customerId: data.customer,
          paymentIntentId: data.payment_intent,
          products: {
            connect: products.map((product) => ({ id: product.id })),
          },
          payment_status: data.payment_status,
          shipping: data.customer_details,
          subTotal: data.amount_subtotal,
          Total: data.amount_total,
        },
      });
      console.log(newTransaction);
    }
  } catch (error) {
    console.log(error);
  }
};

export const stripeMethod = async (
  request: express.Request,
  response: express.Response
) => {
  const sig = request.headers["stripe-signature"];

  let data: any;
  let eventType;

  if (endpointSecret) {
    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
      console.log("Webhook verified");
    } catch (err: any) {
      console.log(`Webhook Error: ${err.message}`);
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    data = event.data.object;
    eventType = event.type;
  } else {
    data = request.body.data.object;
    eventType = request.body.type;
  }

  // Handle the event
  if (eventType === "checkout.session.completed") {
    console.log("Checkout session completed");
    stripe.customers
      .retrieve(data.customer)
      .then((customer: any) => {
        createTransaction(customer, data);
        // console.log("Customer: ", customer);
      })
      .catch((error: any) => console.log(error.message));
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send().end();
};
