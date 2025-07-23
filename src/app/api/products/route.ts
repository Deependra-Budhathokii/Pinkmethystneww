import connect from "@/lib/dbConnect";
import Collection from "@/lib/models/collections";
import SubCollection from "@/lib/models/sub_collections";
import ProductType from "@/lib/models/product_types";
import Product from "@/lib/models/products";
import { Types } from "mongoose";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadImage(base64Image: string) {
  try {
    const result = await cloudinary.uploader.upload(base64Image, {
      folder: "products",
      resource_type: "auto",
    });
    return result.secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
}

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const collectionId = searchParams.get("collectionId");
    const subCollectionId = searchParams.get("subCollectionId");
    const productTypeId = searchParams.get("productTypeId");
    const productId = searchParams.get("id"); // For single product fetch

    await connect();

    // If productId is provided, return single product details
    if (productId && Types.ObjectId.isValid(productId)) {
      const product = await Product.findById(productId)
        .populate("collection", "name")
        .populate("subcollection", "name")
        .populate("productType", "name");

      if (!product) {
        return new NextResponse(
          JSON.stringify({ message: "Product not found" }),
          { status: 404 }
        );
      }

      return new NextResponse(JSON.stringify(product), { status: 200 });
    }

    // For product listing
    const query: any = {};

    if (collectionId && Types.ObjectId.isValid(collectionId)) {
      query.collection = collectionId;
    }

    if (subCollectionId && Types.ObjectId.isValid(subCollectionId)) {
      query.subcollection = subCollectionId;
    }

    if (productTypeId && Types.ObjectId.isValid(productTypeId)) {
      query.productType = productTypeId;
    }

    const products = await Product.find(query)
      .populate("collection", "name")
      .populate("subcollection", "name")
      .populate("productType", "name")
      .sort({ createdAt: -1 });

    return new NextResponse(JSON.stringify(products), { status: 200 });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        message: "Error in fetching Products: " + error.message,
      }),
      { status: 500 }
    );
  }
};

export const POST = async (request: Request) => {
  try {
    await connect();

    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      "name",
      "description",
      "size",
      "color",
      "price",
      "quantity",
      "images",
      "features",
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return new NextResponse(
          JSON.stringify({ message: `${field} is required` }),
          { status: 400 }
        );
      }
    }

    // Validate images array
    if (!Array.isArray(body.images) || body.images.length === 0) {
      return new NextResponse(
        JSON.stringify({ message: "At least one image is required" }),
        { status: 400 }
      );
    }

    // Validate numeric fields
    if (typeof body.price !== "number" || body.price < 0) {
      return new NextResponse(JSON.stringify({ message: "Invalid price" }), {
        status: 400,
      });
    }

    if (typeof body.quantity !== "number" || body.quantity < 0) {
      return new NextResponse(JSON.stringify({ message: "Invalid quantity" }), {
        status: 400,
      });
    }

    if (
      body.discount !== undefined &&
      (typeof body.discount !== "number" ||
        body.discount < 0 ||
        body.discount > 100)
    ) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid discount percentage" }),
        { status: 400 }
      );
    }

    // Validate arrays
    if (!Array.isArray(body.size) || body.size.length === 0) {
      return new NextResponse(
        JSON.stringify({ message: "Size must be a non-empty array" }),
        { status: 400 }
      );
    }

    if (!Array.isArray(body.color) || body.color.length === 0) {
      return new NextResponse(
        JSON.stringify({ message: "Color must be a non-empty array" }),
        { status: 400 }
      );
    }

    // Validate features
    if (!Array.isArray(body.features)) {
      return new NextResponse(
        JSON.stringify({ message: "Features must be an array" }),
        { status: 400 }
      );
    }

    for (const feature of body.features) {
      if (!feature.name || !feature.value) {
        return new NextResponse(
          JSON.stringify({
            message: "Each feature must have name and value",
          }),
          { status: 400 }
        );
      }
    }

    // Optional association validation
    let collection, subCollection, productType;

    // Validate collection if provided
    if (body.collection && Types.ObjectId.isValid(body.collection)) {
      collection = await Collection.findById(body.collection);
      if (!collection) {
        return new NextResponse(
          JSON.stringify({ message: "Invalid Collection" }),
          { status: 400 }
        );
      }
    }

    // Validate subcollection if provided
    if (body.subcollection && Types.ObjectId.isValid(body.subcollection)) {
      subCollection = await SubCollection.findById(body.subcollection);
      if (!subCollection) {
        return new NextResponse(
          JSON.stringify({ message: "Invalid SubCollection" }),
          { status: 400 }
        );
      }

      // Check if subcollection belongs to collection
      if (
        collection &&
        subCollection.collection.toString() !== collection._id.toString()
      ) {
        return new NextResponse(
          JSON.stringify({
            message:
              "SubCollection does not belong to the specified Collection",
          }),
          { status: 400 }
        );
      }
    }

    // Validate product type if provided
    if (body.productType && Types.ObjectId.isValid(body.productType)) {
      productType = await ProductType.findById(body.productType);
      if (!productType) {
        return new NextResponse(
          JSON.stringify({ message: "Invalid ProductType" }),
          { status: 400 }
        );
      }

      // Check if product type belongs to subcollection
      if (
        subCollection &&
        productType.subcollection.toString() !== subCollection._id.toString()
      ) {
        return new NextResponse(
          JSON.stringify({
            message:
              "ProductType does not belong to the specified SubCollection",
          }),
          { status: 400 }
        );
      }
    }

    let imageUrls = [];
    try {
      for (const imageBase64 of body.images) {
        const imageUrl = await uploadImage(imageBase64);
        imageUrls.push(imageUrl);
      }
    } catch (error: any) {
      return new NextResponse(
        JSON.stringify({ message: "Error uploading images: " + error.message }),
        { status: 400 }
      );
    }

    const price = Number(body.price);
    const discount = Number(body.discount || 0);

    if (isNaN(price) || price < 0) {
      return new NextResponse(JSON.stringify({ message: "Invalid price" }), {
        status: 400,
      });
    }

    if (isNaN(discount) || discount < 0 || discount > 100) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid discount percentage" }),
        { status: 400 }
      );
    }

    const finalPrice = body.discount
      ? body.price - (body.price * body.discount) / 100
      : body.price;
    const newProduct = new Product({
      ...body,
      images: imageUrls,
      final_price: finalPrice,
      isAvailable: body.quantity > 0,
      ...(body.collection && { collection: body.collection }),
      ...(body.subcollection && { subcollection: body.subcollection }),
      ...(body.productType && { productType: body.productType }),
    });

    await newProduct.save();

    return new NextResponse(JSON.stringify(newProduct), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        message: "Error in creating Product: " + error.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};

export const PATCH = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("id");

    if (!productId) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid product ID" }),
        { status: 400 }
      );
    }

    if (!Types.ObjectId.isValid(productId)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid product ID format" }),
        { status: 400 }
      );
    }

    await connect();

    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        { status: 404 }
      );
    }

    const body = await request.json();

    if (
      body.price !== undefined &&
      (typeof body.price !== "number" || body.price < 0)
    ) {
      return new NextResponse(JSON.stringify({ message: "Invalid price" }), {
        status: 400,
      });
    }

    if (
      body.quantity !== undefined &&
      (typeof body.quantity !== "number" || body.quantity < 0)
    ) {
      return new NextResponse(JSON.stringify({ message: "Invalid quantity" }), {
        status: 400,
      });
    }

    const updateData: any = { ...body };

    if (body.price || body.discount !== undefined) {
      const price = body.price || existingProduct.price;
      const discount =
        body.discount !== undefined
          ? body.discount
          : existingProduct.discount || 0;

      updateData.final_price = discount
        ? price - (price * discount) / 100
        : price;
    }

    if (body.quantity !== undefined) {
      updateData.isAvailable = body.quantity > 0;
    }

    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key]
    );

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true, runValidators: true }
    );

    return new NextResponse(JSON.stringify(updatedProduct), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        message: "Error updating Product: " + error.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};

export const DELETE = async (request: Request) => {
  try {
    await connect();

    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("id");

    if (!productId || !Types.ObjectId.isValid(productId)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid product ID" }),
        { status: 400 }
      );
    }

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        { status: 404 }
      );
    }

    try {
      if (deletedProduct.images && deletedProduct.images.length > 0) {
        const imagePublicIds = deletedProduct.images
          .map((url: string) => {
            const matches = url.match(/\/v\d+\/(.+)\.\w+$/);
            return matches ? matches[1] : null;
          })
          .filter((id: string | null): id is string => id !== null);
        if (imagePublicIds.length > 0) {
          await cloudinary.api.delete_resources(imagePublicIds);
        }
      }
    } catch (error) {
      console.error("Error deleting images from Cloudinary:", error);
    }

    return new NextResponse(
      JSON.stringify({
        message: "Product deleted successfully",
        deletedProduct,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        message: "Error in deleting Product: " + error.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
