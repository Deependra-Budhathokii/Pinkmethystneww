import mongoose from "mongoose";

// ✅ Import models explicitly to register them
import "@/lib/models/products";
import "@/lib/models/users";

const MONGODB_URI = process.env.MONGODB_URI;

const connect = async () => {
  const connectionState = mongoose.connection.readyState;

  if (connectionState === 1) {
    console.log("Already connected");
    return;
  } else if (connectionState === 2) {
    console.log("Connecting...");
    return;
  }
  try {
    await mongoose.connect(MONGODB_URI!, {
      dbName: "pinkAmethyst",
      bufferCommands: true,
    });
    console.log("Connected to Database");
  } catch (error: any) {
    console.error("Failed to connect to MongoDB", error);
    throw new Error("Failed to connect to MongoDB");
  }
};

export default connect;
