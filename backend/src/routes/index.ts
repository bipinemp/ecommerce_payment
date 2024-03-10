import express from "express";
import products from "./products";
import users from "./users";
import stripe from "./stripe";

const router = express.Router();

export default (): express.Router => {
  products(router);
  users(router);
  stripe(router);
  return router;
};
