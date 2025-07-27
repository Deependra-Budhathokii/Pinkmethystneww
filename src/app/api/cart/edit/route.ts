import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connect from "@/lib/dbConnect";
import User from "@/lib/models/users";
import { Types } from "mongoose";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function PATCH(req: NextRequest) {
  await connect();

  try {
    const cookieStore = cookies();
    8;
    const token = (await cookieStore).get("token");

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token.value, JWT_SECRET) as { id: string };
    const user = await User.findById(decoded.id);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const { productId, quantity } = await req.json();
    if (!productId || typeof quantity !== "number" || quantity < 1) {
      return NextResponse.json({ message: "Invalid data" }, { status: 400 });
    }

    const prodId = new Types.ObjectId(productId);
    const item = user.cart.find((item: any) => item.productId?.equals(prodId));
    if (!item) {
      return NextResponse.json(
        { message: "Item not in cart" },
        { status: 404 }
      );
    }

    item.quantity = quantity;
    await user.save();

    return NextResponse.json({ message: "Quantity updated", cart: user.cart });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  await connect();

  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("token");
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token.value, JWT_SECRET) as { id: string };
    const user = await User.findById(decoded.id);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const { productId } = await req.json();
    if (!productId) {
      return NextResponse.json(
        { message: "Product ID required" },
        { status: 400 }
      );
    }

    // const prodId = new Types.ObjectId(productId);

    user.cart = user.cart.filter((item: any) => {
      const id = item.productId?._id || item.productId;
      return id?.toString() !== productId;
    });

    await user.save();

    return NextResponse.json({ message: "Item removed", cart: user.cart });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
