"use client";

import { getCartItems } from "@/app/actions/getCartItems";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCartOpenStore } from "@/store/store";
import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import getStipePromise from "@/lib/stripe";

const Cart = () => {
  const { isCartOpen, closeCart, openCart } = useCartOpenStore();

  const handleOpenChange = (newOpenState: boolean) => {
    if (newOpenState) {
      openCart(true);
    } else {
      closeCart(false);
    }
  };

  const { data, isPending } = useQuery<CartData[]>({
    queryKey: ["cartitems"],
    queryFn: getCartItems,
  });

  const [totalPriceArr, setTotalPriceArr] = useState<number[]>([]);

  useEffect(() => {
    if (data && data.length > 0) {
      setTotalPriceArr(data?.map((cartItem) => cartItem.totalPrice));
    }
  }, [data]);

  const TotalPrice = totalPriceArr.reduce((prev, curr) => prev + curr, 0);

  const checkout = async () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/`;
    // const stripe = await getStipePromise();

    const updatedData = data?.map((item) => ({
      amount: item.product.price,
      paymentStatus: "created",
      quantity: item.quantity,
      customerId: item.user.id,
      productId: item.product.id,
    }));

    try {
      const response = await axios.post(
        `http://localhost:8000/api/checkout`,
        updatedData
      );
      console.log(response);
      if (response) {
        if (response?.data.url) {
          window.location.href = response?.data?.url;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Sheet open={isCartOpen} onOpenChange={handleOpenChange}>
        <SheetContent className="bg-foreground flex flex-col gap-16">
          <SheetTitle className="text-4xl underline underline-offset-4 text-center font-bold text-background">
            Cart
          </SheetTitle>
          {data && (
            <SheetDescription className="text-background flex flex-col gap-10">
              {data.length > 0 ? (
                data?.map((cartItem) => (
                  <div
                    key={cartItem.product.id}
                    className="flex flex-col gap-3 border border-background rounded-lg p-4"
                  >
                    <div className="flex gap-4 items-start justify-between">
                      <div className="relative w-[80px] h-[80px] rounded-md">
                        <Image
                          src={cartItem.product.image}
                          fill
                          alt="product cart image"
                          className="rounded-md"
                        />
                      </div>
                      <h2>{cartItem.product.name}</h2>
                      <div className="flex flex-col gap-4">
                        <div className="flex justify-end">
                          <p className="font-semibold">
                            ${cartItem.totalPrice}
                            &nbsp;USD
                          </p>
                        </div>
                        <div className="flex gap-2 items-center">
                          <Button
                            className="text-lg font-bold"
                            variant="secondary"
                            size="icon"
                          >
                            -
                          </Button>
                          <span className="w-[30px] text-center">
                            {cartItem.quantity}
                          </span>
                          <Button
                            className="text-lg font-bold"
                            variant="secondary"
                            size="icon"
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <h1 className="text-destructive text-center">
                  No Products in Cart
                </h1>
              )}
              <div className="flex justify-between items-center">
                <h1>Total :</h1>
                <h2>${TotalPrice} USD</h2>
              </div>
              <Button
                variant="secondary"
                className="text-lg font-bold"
                onClick={checkout}
              >
                Checkout using ESewa
              </Button>
            </SheetDescription>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Cart;
