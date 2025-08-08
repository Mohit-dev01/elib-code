import express from "express";
import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
const app = express();

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  const error = createHttpError(400, "Welcome error");
  throw error;
  // res.json({
  //   message: "Welcome to the ebook APIs.",
  // });
});
export default app;
