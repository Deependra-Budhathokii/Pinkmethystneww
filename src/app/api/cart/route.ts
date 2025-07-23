import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User from "@/lib/models/users";
import connect from "@/lib/dbConnect";
// import Product from "@/lib/models/products";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function GET(req: NextRequest) {
  await connect();

  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("token");

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token.value, JWT_SECRET) as {
      id: string;
      email: string;
    };

    const user = await User.findById(decoded.id).populate("cart.productId");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ cart: user.cart }, { status: 200 });
  } catch (error: any) {
    console.error("Cart Fetch Error:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
