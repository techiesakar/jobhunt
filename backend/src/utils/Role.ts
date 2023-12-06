import { NextFunction, Request, Response } from "express";

interface RequestCustom extends Request {
  User: any;
}

export default function authUser(
  req: RequestCustom,
  res: Response,
  next: NextFunction
) {
  if (req.method === "GET") {
    if (req.User.role === "admin") {
      next();
    } else {
      res.status(401).json({
        error: new Error("Invalid request!"),
      });
    }
  }
}
