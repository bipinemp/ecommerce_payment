"use client";

import { ShoppingBag } from "lucide-react";
import React from "react";
import { useCartOpenStore } from "../../store/store";
import Link from "next/link";

const Navbar = () => {
  const { openCart } = useCartOpenStore();
  return (
    <div className="flex w-full items-center justify-between py-5 px-5 text-background border-b border-b-background">
      <Link href={"/"} className="font-bold text-xl text-center">
        ECOMMERCE
      </Link>
      <div className="flex items-center gap-5">
        <Link href={"/login"}>Login</Link>
        <Link href={"/register"}>Register</Link>
        <Link href={"/checkout"}>checkout</Link>
        <Link href={"/user"}>profile</Link>

        <span>
          <ShoppingBag
            className="w-7 h-7 cursor-pointer"
            onClick={() => openCart(true)}
          />
        </span>
      </div>
    </div>
  );
};

export default Navbar;
