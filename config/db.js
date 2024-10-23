
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB connection is successful!");
  } catch (error) {
    console.error("DB connection error:", error.message);
    process.exit(1); // Exit the process with failure
  }
};
