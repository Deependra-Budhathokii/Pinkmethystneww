import { Schema, models, model } from "mongoose";

const SubCollectionSchema = new Schema(
  {
    name: { type: "string", required: true },
    collection: {
      type: Schema.Types.ObjectId,
      ref: "Collection",
    },
  },
  {
    timestamps: true,
    suppressReservedKeysWarning: true,
  }
);
const SubCollection =
  models?.SubCollection || model("SubCollection", SubCollectionSchema);
export default SubCollection;
