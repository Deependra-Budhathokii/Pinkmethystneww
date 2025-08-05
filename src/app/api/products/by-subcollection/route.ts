import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Product from "@/lib/models/products";
import Collection from "@/lib/models/collections";
import SubCollection from "@/lib/models/sub_collections";
// import Product from "@/models/Product";
// import Collection from "@/models/Collection";
// import SubCollection from "@/models/SubCollection";

export async function GET(req: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const collectionSlug = searchParams.get("collection");
    const subcollectionSlug = searchParams.get("subcollection");

    if (!collectionSlug || !subcollectionSlug) {
      return NextResponse.json(
        { error: "Missing collection or subcollection slug" },
        { status: 400 }
      );
    }

    // Find collection and subcollection by slug
    const collection = await Collection.findOne({ slug: collectionSlug });
    const subcollection = await SubCollection.findOne({
      slug: subcollectionSlug,
    });

    if (!collection || !subcollection) {
      return NextResponse.json(
        { error: "Collection or Subcollection not found" },
        { status: 404 }
      );
    }

    // Fetch products by both IDs
    const products = await Product.find({
      collection: collection._id,
      subcollection: subcollection._id,
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products by subcollection:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
