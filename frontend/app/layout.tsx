import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from "../providers/QueryProvider";
import Navbar from "./components/Navbar";
import Cart from "@/components/Cart";
import UserDataFromJWT from "@/components/UserDataFromJWT";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ecommerce with Payment",
  description: "Create by Bipin Bhandari",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-foreground`}>
        <QueryProvider>
          <Navbar />
          {children}
          <Cart />
          {/* <UserDataFromJWT /> */}
        </QueryProvider>
      </body>
    </html>
  );
}
