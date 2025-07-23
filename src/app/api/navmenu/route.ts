// /app/api/navmenu/route.ts

import connect from "@/lib/dbConnect";
import Collection from "@/lib/models/collections";
import SubCollection from "@/lib/models/sub_collections";
import { NextResponse } from "next/server";

export const GET = async () => {
  await connect();

  const collections = await Collection.find();
  const subcollections = await SubCollection.find();

  const navMenu = collections.map((collection) => {
    const subs = subcollections.filter(
      (sub) => sub.collection.toString() === collection._id.toString()
    );

    return {
      _id: collection._id,
      name: collection.name,
      subcollections: subs.map((sub) => ({
        _id: sub._id,
        name: sub.name,
      })),
    };
  });

  return NextResponse.json(navMenu, { status: 200 });
};
