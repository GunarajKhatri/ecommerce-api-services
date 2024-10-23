import mongoose from "mongoose";
import { Schema } from "mongoose";

const CategorySchema = new Schema(
  {
    name: { type: String, required: true,unique:true},
    description: { type: String },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      }
    ]
  },
  { timestamps: true }
);
const Category = mongoose.model("Category", CategorySchema);
export default Category;
