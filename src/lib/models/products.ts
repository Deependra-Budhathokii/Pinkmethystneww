import { Schema, models, model } from "mongoose";

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    size: {
      type: [String],
      required: true,
    },
    color: {
      type: [String],
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    features: [
      {
        name: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    images: {
      type: [String],
      required: true,
    },
    discount: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    final_price: {
      type: Number,
      required: true,
    },
    collection: {
      type: Schema.Types.ObjectId,
      ref: "Collection",
    },
    subcollection: {
      type: Schema.Types.ObjectId,
      ref: "SubCollection",
    },
    productType: {
      type: Schema.Types.ObjectId,
      ref: "ProductType",
    },
    rating_avg: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    isInStockClearance: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    suppressReservedKeysWarning: true,
  }
);

// Calculate final price and availability before validation
ProductSchema.pre("validate", function (next) {
  if (this.price) {
    const discount = this.discount || 0;
    this.final_price = this.price - (this.price * discount) / 100;
  }

  // Update availability based on quantity
  this.isAvailable = this.quantity > 0;

  next();
});

const Product = models.Product || model("Product", ProductSchema);
export default Product;
