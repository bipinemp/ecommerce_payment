import jwt from "jsonwebtoken";
import prisma from "../db/prisma";
import { Response } from "express";

export const protect = async (req: any, res: Response, next: any) => {
  let token;
  token = req.cookies.jwt;
  // console.log("REQ Cookies: ", req.cookies);
  // console.log("Req only: ", req);
  if (token) {
    try {
      const decoded: any = jwt.decode(token);
      req.user = await prisma.user.findUnique({
        where: {
          id: decoded.userId,
        },
        // Omit the password field from the returned user object
        select: {
          id: true,
          name: true,
          email: true,
        },
      });
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized , invalid token");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized , no token");
  }
};
