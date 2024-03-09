import express from "express";
import {
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/users";
import { protect } from "../middlewares/authMiddleware";

export default (router: express.Router) => {
  router.post("/login", loginUser);
  router.post("/register", registerUser);
  router.post("/logout", logoutUser);

  router.get("/profile", protect, getUserProfile);
};
