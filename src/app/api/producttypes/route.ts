import connect from "@/lib/dbConnect";
import ProductType from "@/lib/models/product_types";
import SubCollection from "@/lib/models/sub_collections";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const subCollectionId = searchParams.get("subCollectionId");
    const productTypeId = searchParams.get("id");

    await connect();

    // Get single product type if ID is provided
    if (productTypeId) {
      if (!Types.ObjectId.isValid(productTypeId)) {
        return new NextResponse(
          JSON.stringify({ message: "Invalid Product Type Id" }),
          {
            status: 400,
          }
        );
      }

      const productType = await ProductType.findById(productTypeId).populate(
        "subcollection",
        "name"
      );

      if (!productType) {
        return new NextResponse(
          JSON.stringify({ message: "Product Type not found" }),
          {
            status: 404,
          }
        );
      }

      return new NextResponse(JSON.stringify(productType), { status: 200 });
    }
    // if subcollectionId is provided, filter by it
    if (subCollectionId) {
      if (!Types.ObjectId.isValid(subCollectionId)) {
        return new NextResponse(
          JSON.stringify({ message: "Invalid SubCollection Id" }),
          {
            status: 400,
          }
        );
      }
      const subCollection = await SubCollection.findById(subCollectionId);

      if (!subCollection) {
        return new NextResponse(
          JSON.stringify({ message: "Subcollection not found" }),
          {
            status: 404,
          }
        );
      }
      const productTypes = await ProductType.find({
        subcollection: new Types.ObjectId(subCollectionId),
      })
        .sort({ createdAt: -1 })
        .populate("subcollection", "name");
    }
    // if no filters are provided, return all productTypes
    const allProductTypes = await ProductType.find()
      .sort({ createdAt: -1 })
      .populate("subcollection", "name");

    return new NextResponse(JSON.stringify(allProductTypes), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        message: "Error fetching product type: " + error.message,
      }),
      { status: 500 }
    );
  }
};

export const POST = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const subCollectionId = searchParams.get("subCollectionId");
    const { name } = await request.json();

    if (!name) {
      return new NextResponse(
        JSON.stringify({ message: "Product Type Name is required" }),
        {
          status: 400,
        }
      );
    }
    if (!subCollectionId || !Types.ObjectId.isValid(subCollectionId)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid SubCollection Id" }),
        {
          status: 400,
        }
      );
    }
    await connect();

    const subCollection = await SubCollection.findById(subCollectionId);
    if (!subCollection) {
      return new NextResponse(
        JSON.stringify({ message: "Subcollection not found" }),
        {
          status: 404,
        }
      );
    }
    const newProductType = new ProductType({
      name,
      subcollection: new Types.ObjectId(subCollectionId),
    });
    await newProductType.save();
    return new NextResponse(JSON.stringify(newProductType), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        message: "Error adding product type: " + error.message,
      }),
      { status: 500 }
    );
  }
};
