import { HttpError } from "http-errors";
import { NextFunction, Request, Response } from "express";
import config from "../config/config";

const globalErrorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message;
  return res.status(statusCode).json({
    error: message,
    stack: config.NODE_ENV === "develpoment" ? err.stack : "",
  });
};
export default globalErrorHandler;
