import React from "react";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import SetUserId from "./SetUserId";

interface JWTPayload {
  userId: string;
  iat: number;
  exp: number;
}

export const getJwtSecretKey = () => {
  const secret = process.env.JWT_SECRET;

  if (!secret || secret.length === 0) {
    throw new Error("The Env. Variable for JWT SECRET is not set");
  }

  return secret;
};

const UserDataFromJWT = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("jwt")?.value.toString();

  const { userId } = (token && jwt.decode(token)) as JWTPayload;

  return (
    <>
      <SetUserId userId={userId || ""} />
    </>
  );
};

export default UserDataFromJWT;
