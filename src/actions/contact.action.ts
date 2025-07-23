"use server";

// import Contact from "@/models/Contact";
// import connectDB from "@/lib/connectDB";
import connectDB from "@/lib/dbConnect";
import Contact from "@/lib/models/Contact";
import { revalidatePath } from "next/cache";

// Submit a Contact form, or Add a message
export const addMessage = async (data: any) => {
  if (!data) {
    return { success: false, message: "Invalid message data" };
  }

  await connectDB();
  const contact = new Contact(data);
  try {
    await contact.save();
    // revalidatePath("/admin/messages");

    return { success: true, message: "Message added successfully" };
  } catch (err) {
    console.error("Failed to add the message", err);
    return {
      success: false,
      message: "Failed to add the message",
      error: (err as Error).message,
    };
  }
};

// For ADMIN PANEL VIE AND DELETE
// Adding server actions: getMessages and deleteMessage
export const getMessages = async () => {
  await connectDB();
  try {
    const messages = await Contact.find().sort({ createdAt: -1 }).lean();
    // Convert _id and createdAt to string for serialization
    const safeMessages = messages.map((msg: any) => ({
      ...msg,
      _id: msg._id.toString(),
      createdAt: msg.createdAt ? msg.createdAt.toISOString() : "",
    }));
    return { success: true, data: safeMessages };
  } catch (error) {
    return { success: false, error: "Failed to fetch messages" };
  }
};

export const deleteMessage = async (id: string) => {
  await connectDB();
  try {
    await Contact.findByIdAndDelete(id);
    revalidatePath("/admin/messages"); // if using caching
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete message" };
  }
};
