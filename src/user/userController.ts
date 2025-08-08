import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import UserModel from "./userModel";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    const error = createHttpError(400, "All fields are required");
    return next(error);
  }

  const emailFromDatabase = await UserModel.findOne({
    email: email,
  });

  if (emailFromDatabase) {
    const error = createHttpError(400, "Email already exists");
    return next(error);
  }
  return res.json({
    message: "Create user",
  });
};
export { createUser };
