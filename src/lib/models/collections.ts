import { Schema, models, model } from "mongoose";
import slugify from "slugify";

const CollectionSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true },
  },
  { timestamps: true, suppressReservedKeysWarning: true }
);

// Auto-generate slug from name
CollectionSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true });
  }
  next();
});

const Collection = models.Collection || model("Collection", CollectionSchema);
export default Collection;
