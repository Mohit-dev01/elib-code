import app from "./app";
import config from "./config/config";
import connectDb from "./config/db";

const startServer = async () => {
  const PORT = config.port;
  await connectDb();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
startServer();
