import mongoose from "mongoose";
import { Schema } from "mongoose";

const OrderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    
    products: [{
      productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }],
    
    totalAmount: { type: Number, required: true },
    
    status: { type: String, enum: ["Pending", "Shipped", "Delivered", "Cancelled"], default: "Pending" },

    
    shippingAddress: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      postalCode: { type: String },
      country: { type: String }
    },

   
    billingAddress: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      postalCode: { type: String },
      country: { type: String }
    },

    
    paymentMethod: {
      type: String, 
      enum: ["Credit Card", "PayPal", "Cash on Delivery", "Bank Transfer"]
    },

    orderNotes: { type: String },

  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);
export default Order;
