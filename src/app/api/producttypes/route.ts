import connect from "@/lib/dbConnect";
import ProductType from "@/lib/models/product_types";
import SubCollection from "@/lib/models/sub_collections";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
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

      const productType = await ProductType.findById(productTypeId);

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

    // if no ID provided, return all productTypes
    const allProductTypes = await ProductType.find().sort({ createdAt: -1 });

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
    const { name } = await request.json();

    if (!name) {
      return new NextResponse(
        JSON.stringify({ message: "Product Type Name is required" }),
        {
          status: 400,
        }
      );
    }

    await connect();

    const newProductType = new ProductType({
      name,
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
