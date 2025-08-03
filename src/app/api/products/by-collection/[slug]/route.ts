// src/app/api/products/by-collection/[slug]/route.ts
// import { connectDB } from "@/lib/db";
// import Product from "@/models/Product";
// import Collection from "@/models/Collection";
import connect from "@/lib/dbConnect";
import Collection from "@/lib/models/collections";
import Product from "@/lib/models/products";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    await connect();

    const collection = await Collection.findOne({ slug: params.slug });

    if (!collection) {
      return NextResponse.json(
        { error: "Collection not found" },
        { status: 404 }
      );
    }

    const products = await Product.find({ collection: collection._id });

    return NextResponse.json(products);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
