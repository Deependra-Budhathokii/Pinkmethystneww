import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

// Function to verify JWT token
async function verifyToken(token: string) {
  try {
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || "your-secret-key"
    );
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  // Get token from cookies
  const token = request.cookies.get("token")?.value;

  // If no token, redirect to admin login
  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    // Verify token and check role
    const payload = await verifyToken(token);

    if (!payload) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Check if user has admin role
    if (payload.role !== "admin") {
      // Redirect to unauthorized page or admin login
      return NextResponse.redirect(new URL("/", request.url));
    }

    // If all checks pass, allow the request
    return NextResponse.next();
  } catch (error) {
    // If token verification fails, redirect to admin login
    return NextResponse.redirect(new URL("/", request.url));
  }
}

// Configure middleware to run only on admin routes
export const config = {
  matcher: [
    "/admin",
    "/admin/dashboard",
    "/admin/product-stock",
    "/admin/stock-clearance",
  ],
};
