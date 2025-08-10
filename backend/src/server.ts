import app from "./app";
import bookRouter from "./book/bookRouter";
import config from "./config/config";
import connectDb from "./config/db";
import globalErrorHandler from "./middleware/globalErrorHandler";
import userRouter from "./user/userRouter";
import express from "express";

const startServer = async () => {
  const PORT = config.port;
  await connectDb();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  app.use(express.json());

  app.use("/api/users", userRouter);
  app.use("/api/books", bookRouter);
  app.use(globalErrorHandler);
};
startServer();
