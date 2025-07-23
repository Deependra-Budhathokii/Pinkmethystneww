import mongoose from "mongoose";

// Creating Schema
const ContactSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

// compiling Schema | creating model,

const Contact =
  mongoose.models.Contact || mongoose.model("Contact", ContactSchema);

export default Contact;
