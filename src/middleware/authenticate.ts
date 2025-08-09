import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { verify } from "jsonwebtoken";
import config from "../config/config";

export interface AuthenticateRequest extends Request {
  userId: string;
}

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  //   const token = req.headers.authorization?.split(" ")[1];
  const token = req.header("Authorization");
  if (!token) {
    return next(createHttpError(400, "Token is not available"));
  }

  try {
    const parsedToken = token.split(" ")[1];
    const decodedToken = verify(
      parsedToken as string,
      config.JWT_SECRET as string
    );
    console.log("decoded Token", decodedToken);
    const _req = req as AuthenticateRequest;
    _req.userId = decodedToken.sub as string;
    next();
  } catch (error) {
    console.log(error);
    return next(createHttpError(401, "Authorization token is expired"));
  }
};

export default authenticate;
