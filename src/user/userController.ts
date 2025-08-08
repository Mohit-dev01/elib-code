import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import UserModel from "./userModel";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import config from "../config/config";
import { User } from "./userTypes";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    const error = createHttpError(400, "All fields are required");
    return next(error);
  }

  try {
    const emailFromDatabase = await UserModel.findOne({
      email: email,
    });

    if (emailFromDatabase) {
      const error = createHttpError(400, "Email already exists");
      return next(error);
    }
  } catch (error) {
    return next(createHttpError(500, "Error checking email :" + error));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  let newUser: User;
  try {
    newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });
  } catch (error) {
    return next(createHttpError(500, "Error creating new user :" + error));
  }
  try {
    const jwtToken = sign({ data: newUser._id }, config.JWT_SECRET as string, {
      expiresIn: "7d",
    });

    return res.status(201).json({
      accessToken: jwtToken,
    });
  } catch (error) {
    return next(createHttpError(500, "Error signing JWT token : " + error));
  }
};
export { createUser };
