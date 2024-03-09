import express from "express";
import {
  addToCart,
  confirmCheckout,
  createOrder,
  getAllCartItems,
  getAllProducts,
} from "../controllers/products";

export default (router: express.Router) => {
  router.get("/products", getAllProducts);

  // Cart
  router.post("/cart", addToCart);
  router.get("/cartitems", getAllCartItems);
  router.post("/checkout", confirmCheckout);
  router.post("/orders/create", createOrder);
};
