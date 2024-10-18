
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/hello");
    console.log("DB connection is successful!");
  } catch (error) {
    console.error("DB connection error:", error);
    process.exit(1); // Exit the process with failure
  }
};
