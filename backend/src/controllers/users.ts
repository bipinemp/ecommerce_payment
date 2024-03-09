import prisma from "../db/prisma";
import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import generateToken from "../../utils/generatetoken";

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const userExists = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (userExists) {
    res.status(400).json({ message: "name or email already used" });
  }

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  if (user) {
    return res.status(201).json({ message: "User registered Successfully" });
  } else {
    return res.status(400).json({ message: "Invalid User Data" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findFirst({ where: { email } });
  const isPassMatches = await bcrypt.compare(password, String(user?.password));

  if (user && isPassMatches) {
    generateToken(res, user.id);
    return res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      status: 201,
    });
  } else {
    res.status(400).json({ message: "Inavlid Creadentials" });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User logged Out" });
};

export const getUserProfile = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req?.user?.id;

  const user = await prisma.user.findFirst({ where: { id: userId } });

  if (user) {
    res.status(200).json({ message: "User profile fetched", user });
  } else {
    res.status(400).json({ message: "User not found" });
  }
};
