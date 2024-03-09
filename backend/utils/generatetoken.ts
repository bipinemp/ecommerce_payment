import jwt from "jsonwebtoken";
import express from "express";

const generateToken = (res: express.Response, userId: string) => {
  const ENVIRONMENT = process.env.NODE_ENV || "development";

  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "10d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    // secure: ENVIRONMENT === "production",
    // sameSite: ENVIRONMENT === "production" ? "none" : "lax",
    // maxAge: 10 * 24 * 60 * 60 * 1000,
    // path: "/",
  });
};
export default generateToken;
