import express from "express";
import { stripeMethod } from "../controllers/stripe";

export default (router: express.Router) => {
  router.post(
    "/webhook",
    express.raw({ type: "application/json" }),
    stripeMethod
  );
};
