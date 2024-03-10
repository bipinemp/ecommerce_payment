"use client";

import { useUserId } from "@/store/store";
import axios from "axios";
import React, { useEffect } from "react";
// import { cookies } from "next/headers";
// import jwt from "jsonwebtoken";
// import SetUserId from "./SetUserId";

// interface JWTPayload {
//   userId: string;
//   iat: number;
//   exp: number;
// }

// export const getJwtSecretKey = () => {
//   const secret = process.env.JWT_SECRET;

//   if (!secret || secret.length === 0) {
//     throw new Error("The Env. Variable for JWT SECRET is not set");
//   }

//   return secret;
// };

const UserDataFromJWT = () => {
  const { setUserId } = useUserId();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/users/profile",
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          setUserId(response.data.user.id);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);
  // const cookieStore = cookies();
  // const token = cookieStore.get("jwt")?.value.toString();

  // const { userId } = (token && jwt.decode(token)) as JWTPayload;

  return <>{/* <SetUserId userId={userId || ""} /> */}</>;
};

export default UserDataFromJWT;
