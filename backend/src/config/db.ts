import mongoose from "mongoose";
import config from "./config";

const connectDb = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Connected to MongoDB");
    });
    mongoose.connection.on("error", (error) => {
      console.error("MongoDB connection error:", error);
    });
    await mongoose.connect(config.MONGO_DB_URI);
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

export default connectDb;
