import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import UserModel from "./userModel";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import config from "../config/config";

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

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await UserModel.create({
    name,
    email,
    password: hashedPassword,
  });

  const jwtToken = sign({ data: newUser._id }, config.JWT_SECRET as string, {
    expiresIn: "7d",
  });

  return res.json({
    accessToken: jwtToken,
  });
};
export { createUser };
