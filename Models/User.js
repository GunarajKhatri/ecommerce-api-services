import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required!!"],
    },
    email: {
      type: String,
      required: [true, "Email is required!!"],
      unique: true,
    },
    password: {
      type: String,
      min: 6,
      required: [true, "Password is required!!"],
      select: false, 
    },
    address: {
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
      required: true,
    },
    cart: {
      items: [
        {
          productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
          },
          quantity: {
            type: Number,
            default: 1,
          },
          price:{
            type:Number
          }
        }
      ],
      cartTotalPrice: {
        type: Number,
        default: 0,
      },
    },
    orders: [
      {
        type: Schema.Types.ObjectId, // Reference the Order model
        ref: "Order",
      },
    ],
  },
  { timestamps: true }
);

UserSchema.set("toJSON", {
  transform: (doc, { __v, password, ...rest }, options) => rest,
});
const User = mongoose.model("User", UserSchema);
export default User;
