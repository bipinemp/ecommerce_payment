import express from "express";
import products from "./products";
import users from "./users";

const router = express.Router();

export default (): express.Router => {
  products(router);
  users(router);
  return router;
};
