import jwt from "jsonwebtoken";
import express from "express";

const generateToken = (res: express.Response, userId: string) => {
  // const ENVIRONMENT = process.env.NODE_ENV || "development";

  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "10d",
  });

  if (token) {
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true, // Use secure cookies in production
      sameSite: "strict", // Prevent CSRF attacks
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });
  }
};
export default generateToken;
