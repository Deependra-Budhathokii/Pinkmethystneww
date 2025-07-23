import { Schema, models, model } from "mongoose";

const CollectionSchema = new Schema(
  {
    name: { type: "string", required: true },
  },
  { timestamps: true, suppressReservedKeysWarning: true }
);

const Collection = models.Collection || model("Collection", CollectionSchema);
export default Collection;
