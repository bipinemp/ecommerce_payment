import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

interface UserJwtPayload {
  jti: string;
  iat: string;
}

export const getJwtSecretKey = () => {
  const secret = process.env.JWT_SECRET;

  if (!secret || secret.length === 0) {
    throw new Error("The Env. Variable for JWT SECRET is not set");
  }

  return secret;
};

export async function middleware(req: NextRequest) {
  const cookieStore = cookies();
  const token = cookieStore.get("jwt")?.value.toString();
  try {
    const decoded =
      token && jwtVerify(token, new TextEncoder().encode(getJwtSecretKey()));

    if (!decoded) {
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }
  } catch (error) {
    throw new Error("Your Token has expired");
  }
}

export const config = {
  matcher: ["/checkout"],
};

//   const token = await getToken({ req });
//   const isPublicPath = req.nextUrl.pathname === "/sign-in";
//   if (isPublicPath && token) {
//     return NextResponse.redirect(new URL("/", req.nextUrl));
//   }
//   if (!isPublicPath && !token) {
//     return NextResponse.redirect(new URL("/sign-in", req.nextUrl));
//   }
