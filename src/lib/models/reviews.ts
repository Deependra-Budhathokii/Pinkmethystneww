import { Schema, model, models } from "mongoose";

const ReviewSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
    },
    review: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Review = models.Review || model("Review", ReviewSchema);
export default Review;
