// /api/product/[slug]/route.ts
import connect from "@/lib/dbConnect";
import Product from "@/lib/models/products";
import { NextResponse } from "next/server";
// import connectDB from "@/lib/db";
// import Product from "@/models/Product";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  await connect();

  const product = await Product.findOne({ slug: params.slug });

  if (!product) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}
