// // lib/auth.ts
// import { SignJWT, jwtVerify } from "jose";
// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";

// const JWT_SECRET = process.env.JWT_SECRET || "your-default-secret-key";
// const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

// export interface JWTPayload {
//   userId: string;
//   email: string;
//   iat?: number;
//   exp?: number;
// }

// /**
//  * Signs a new JWT token
//  */
// export async function signToken(payload: JWTPayload) {
//   const secret = new TextEncoder().encode(JWT_SECRET);

//   const token = await new SignJWT(payload)
//     .setProtectedHeader({ alg: "HS256" })
//     .setIssuedAt()
//     .setExpirationTime("30d")
//     .sign(secret);

//   return token;
// }

// /**
//  * Verifies a JWT token
//  */
// export async function verifyToken(token: string): Promise<JWTPayload | null> {
//   try {
//     const secret = new TextEncoder().encode(JWT_SECRET);
//     const { payload } = await jwtVerify(token, secret);
//     return payload as JWTPayload;
//   } catch (error) {
//     return null;
//   }
// }

// /**
//  * Sets the authentication cookie in the response
//  */
// export function setAuthCookie(response: NextResponse, token: string) {
//   response.cookies.set({
//     name: "auth-token",
//     value: token,
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "lax",
//     maxAge: MAX_AGE,
//     path: "/",
//   });
// }

// /**
//  * Gets the current user from the auth token
//  */
// export async function getCurrentUser() {
//   const cookieStore = cookies();
//   const token = cookieStore.get("auth-token");

//   if (!token) {
//     return null;
//   }

//   const payload = await verifyToken(token.value);
//   return payload;
// }

// /**
//  * Removes the auth cookie
//  */
// export function removeAuthCookie(response: NextResponse) {
//   response.cookies.set({
//     name: "auth-token",
//     value: "",
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "lax",
//     maxAge: 0,
//     path: "/",
//   });
// }

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "verysecret";

export interface AuthPayload {
  id: string;
  email: string;
  role: "user" | "admin";
  exp?: number;
  iat?: number;
}

/**
 * Extracts and verifies the JWT token from cookies
 * and returns the decoded payload (user info).
 */
export async function getCurrentUser(): Promise<AuthPayload | null> {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token");

  if (!token?.value) return null;

  try {
    const decoded = jwt.verify(token.value, JWT_SECRET) as AuthPayload;
    return decoded;
  } catch (err) {
    console.error("JWT verification failed:", err);
    return null;
  }
}
