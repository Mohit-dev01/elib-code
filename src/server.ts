import app from "./app";
import config from "./config/config";
import connectDb from "./config/db";
import globalErrorHandler from "./middleware/globalErrorHandler";
import userRouter from "./user/userRouter";

const startServer = async () => {
  const PORT = config.port;
  await connectDb();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  app.use("/api/users", userRouter);
  app.use(globalErrorHandler);
};
startServer();
