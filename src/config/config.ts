import dotenv from "dotenv";
dotenv.config();

const config = {
  port: process.env.PORT,
  MONGO_DB_URI: process.env.MONGO_DB_URI || "",
  NODE_ENV: process.env.NODE_ENV || "development",
  JWT_SECRET: process.env.JWT_SECRET,
};

export default config;
