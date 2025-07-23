import connect from "@/lib/dbConnect";
import Product from "@/lib/models/products";
import Review from "@/lib/models/reviews";
import User from "@/lib/models/users";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connect();
    const allReviews = await Review.find()
      .sort({ createdAt: -1 })
      .populate("user")
      .populate("product");
    if (!allReviews) {
      return new NextResponse(
        JSON.stringify({ message: "Reviews Not Found" }),
        {
          status: 404,
        }
      );
    }
    return new NextResponse(JSON.stringify(allReviews), { status: 200 });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        message: "Error fetching reviews: " + error.message,
      }),
      { status: 500 }
    );
  }
};

export const POST = async (request: Request) => {
  try {
    const { user, product, rating, review } = await request.json();
    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User is required" }), {
        status: 400,
      });
    }

    const isValidUser = await User.findById(user);
    if (!isValidUser) {
      return new NextResponse(
        JSON.stringify({ message: "User is Not Registered" }),
        {
          status: 400,
        }
      );
    }

    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "Product is required" }),
        { status: 400 }
      );
    }
    const isValidProduct = await Product.findById(product);

    if (!isValidProduct) {
      return new NextResponse(
        JSON.stringify({ message: "Product with provided ID doesn't exists" }),
        {
          status: 400,
        }
      );
    }

    await connect();
    const newReview = new Review({
      user: isValidUser._id,
      product: isValidProduct._id,
      rating,
      review,
    });
    await newReview.save();
    return new NextResponse(JSON.stringify(newReview), { status: 201 });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        message: "Error in adding review: " + error.message,
      }),
      { status: 500 }
    );
  }
};
