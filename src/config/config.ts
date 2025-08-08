import dotenv from "dotenv";
dotenv.config();

const config = {
  port: process.env.PORT,
  MONGO_DB_URI: process.env.MONGO_DB_URI || "",
};

export default config;
