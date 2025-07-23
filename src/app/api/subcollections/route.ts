import connect from "@/lib/dbConnect";
import SubCollection from "@/lib/models/sub_collections";
import Collection from "@/lib/models/collections";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const collectionId = searchParams.get("collectionId");
    const subCollectionId = searchParams.get("id");

    await connect();

    // Get single subcollection if ID is provided
    if (subCollectionId) {
      if (!Types.ObjectId.isValid(subCollectionId)) {
        return new NextResponse(
          JSON.stringify({ message: "Invalid Subcollection Id" }),
          { status: 400 }
        );
      }

      const subCollection = await SubCollection.findById(
        subCollectionId
      ).populate("collection", "name");

      if (!subCollection) {
        return new NextResponse(
          JSON.stringify({ message: "Subcollection not found" }),
          { status: 404 }
        );
      }

      return new NextResponse(JSON.stringify(subCollection), { status: 200 });
    }

    // If collectionId is provided, filter by it
    if (collectionId) {
      if (!Types.ObjectId.isValid(collectionId)) {
        return new NextResponse(
          JSON.stringify({ message: "Invalid Collection Id" }),
          { status: 400 }
        );
      }

      const collection = await Collection.findById(collectionId);
      if (!collection) {
        return new NextResponse(
          JSON.stringify({ message: "Collection not found" }),
          { status: 404 }
        );
      }

      const subCollections = await SubCollection.find({
        collection: new Types.ObjectId(collectionId),
      })
        .sort({ createdAt: -1 })
        .populate("collection", "name");

      return new NextResponse(JSON.stringify(subCollections), { status: 200 });
    }

    // If no filters are provided, return all subcollections
    const allSubCollections = await SubCollection.find()
      .sort({ createdAt: -1 })
      .populate("collection", "name");

    return new NextResponse(JSON.stringify(allSubCollections), { status: 200 });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        message: "Error fetching subcollection: " + error.message,
      }),
      { status: 500 }
    );
  }
};

export const POST = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const collectionId = searchParams.get("collectionId");
    const { name } = await request.json();

    if (!name) {
      return new NextResponse(
        JSON.stringify({ message: "Subcollection name is required" }),
        { status: 400 }
      );
    }

    if (!collectionId || !Types.ObjectId.isValid(collectionId)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid Collection Id" }),
        { status: 400 }
      );
    }

    await connect();

    const collection = await Collection.findById(collectionId);
    if (!collection) {
      return new NextResponse(
        JSON.stringify({ message: "Collection not found" }),
        { status: 404 }
      );
    }

    const newSubCollection = new SubCollection({
      name,
      collection: new Types.ObjectId(collectionId),
    });

    await newSubCollection.save();

    return new NextResponse(JSON.stringify(newSubCollection), { status: 201 });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        message: "Error creating subcollection: " + error.message,
      }),
      { status: 500 }
    );
  }
};
