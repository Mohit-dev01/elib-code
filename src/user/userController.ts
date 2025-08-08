import { Request, Response, NextFunction } from "express";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  return res.json({
    message: "Create user",
  });
};
export { createUser };
