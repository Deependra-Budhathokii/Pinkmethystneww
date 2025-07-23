import { Schema, model, models } from "mongoose";
const productTypeSchema = new Schema(
  {
    name: { type: "string" },
    subcollection: {
      type: Schema.Types.ObjectId,
      ref: "SubCollection",
    },
  },
  {
    timestamps: true,
  }
);
const ProductType =
  models?.ProductType || model("ProductType", productTypeSchema);
export default ProductType;
