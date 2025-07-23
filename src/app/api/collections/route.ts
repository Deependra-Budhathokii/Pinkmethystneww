import connect from "@/lib/dbConnect";
import Collection from "@/lib/models/collections";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connect();
    const allCollections = await Collection.find().sort({ createdAt: -1 });
    return new NextResponse(JSON.stringify(allCollections), { status: 200 });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        message: "Error in fetching collections: " + error.message,
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
        JSON.stringify({ message: "Collection name is required" }),
        { status: 400 }
      );
    }
    await connect();
    const newCollection = new Collection({ name });
    await newCollection.save();
    return new NextResponse(JSON.stringify(newCollection), { status: 201 });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        message: "Error in creating collection: " + error.message,
      }),
      { status: 500 }
    );
  }
};
