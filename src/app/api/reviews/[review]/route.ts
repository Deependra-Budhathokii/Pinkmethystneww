import connect from "@/lib/dbConnect";
import Review from "@/lib/models/reviews";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    // For single review fetch
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop(); // Get the last part of the URL as the ID

    if (!id) {
      return new NextResponse(
        JSON.stringify({ message: "Review ID is required" }),
        { status: 400 }
      );
    }

    await connect();

    const review = await Review.findById(id)
      .populate("user")
      .populate("product");

    if (!review) {
      return new NextResponse(JSON.stringify({ message: "Review not found" }), {
        status: 404,
      });
    }

    // Return the review data
    return new NextResponse(JSON.stringify(review), { status: 200 });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        message: "Error fetching review: " + error.message,
      }),
      { status: 500 }
    );
  }
};
