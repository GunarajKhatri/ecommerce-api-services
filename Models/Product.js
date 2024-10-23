import mongoose from "mongoose";
import { Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true,min:0 },
    stock: { type: Number, required: true }, 
    imageUrl: { type: String,required:true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    reviews: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        rating: { type: Number, min: 1, max: 5 },
        comment: { type: String },
      },
    ],
    averageRating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 }, 
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);
const Product = mongoose.model("Product", ProductSchema);
export default Product;
