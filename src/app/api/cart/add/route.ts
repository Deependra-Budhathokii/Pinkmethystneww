import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import connect from "@/lib/dbConnect";
import User from "@/lib/models/users";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function POST(req: NextRequest) {
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

    const userId = decoded.id;
    const { productId, quantity } = await req.json();

    if (!productId || !quantity) {
      return NextResponse.json(
        { message: "Product ID and quantity are required" },
        { status: 400 }
      );
    }

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const prodId = new Types.ObjectId(productId); // ✅ Ensure it's an ObjectId

    // Initialize cart if needed
    if (!Array.isArray(user.cart)) {
      user.cart = [];
    }

    const existingItemIndex = user.cart.findIndex((item: any) =>
      item.productId?.equals(prodId)
    );

    if (existingItemIndex !== -1) {
      // Update quantity
      user.cart[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      user.cart.push({ productId: prodId, quantity });
    }

    await user.save();

    return NextResponse.json(
      { message: "Item added to cart", cart: user.cart },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Add to Cart Error:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
