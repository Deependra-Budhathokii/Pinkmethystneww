// import { Schema, models, model } from "mongoose";

// const SubCollectionSchema = new Schema(
//   {
//     name: { type: "string", required: true },
//     collection: {
//       type: Schema.Types.ObjectId,
//       ref: "Collection",
//     },
//   },
//   {
//     timestamps: true,
//     suppressReservedKeysWarning: true,
//   }
// );
// const SubCollection =
//   models?.SubCollection || model("SubCollection", SubCollectionSchema);
// export default SubCollection;

import { Schema, models, model } from "mongoose";
import slugify from "slugify";

const SubCollectionSchema = new Schema(
  {
    name: { type: "string", required: true },
    slug: { type: String, required: true, unique: true },
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

// Auto-generate slug before saving
SubCollectionSchema.pre("validate", function (next) {
  if (this.name && !this.slug) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

const SubCollection =
  models?.SubCollection || model("SubCollection", SubCollectionSchema);
export default SubCollection;
