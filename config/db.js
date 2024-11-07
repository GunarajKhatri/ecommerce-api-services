import mongoose from "mongoose";

const getMongoUri = () => {
  if (process.env.NODE_ENV === "docker") {
    return process.env.MONGODB_URI_DOCKER; // MongoDB URI for Docker
  }
  return process.env.MONGODB_URI_LOCAL; // MongoDB URI for local development
};

export const connectDB = async () => {
  try {
    await mongoose.connect(getMongoUri(), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB connection is successful!");
  } catch (error) {
    console.error("DB connection error:", error.message);
    throw error;
    process.exit(1); // Exit the process with failure
  }
};
