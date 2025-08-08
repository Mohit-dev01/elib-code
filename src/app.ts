import express from "express";
import { Request, Response, NextFunction } from "express";
const app = express();

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: "Welcome to the ebook APIs.",
  });
});
export default app;
