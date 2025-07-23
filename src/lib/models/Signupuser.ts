import mongoose, { Schema, Document, models } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone: string;
  image?: string;
  address: {
    province: string;
    district: string;
    street: string;
    landmark?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    image: { type: String },
    address: {
      province: { type: String, required: true },
      district: { type: String, required: true },
      street: { type: String, required: true },
      landmark: { type: String },
    },
  },
  { timestamps: true }
);

const User = models.User || mongoose.model<IUser>("User", userSchema);
export default User;
