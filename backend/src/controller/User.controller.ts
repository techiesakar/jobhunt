require("dotenv").config();
import { NextFunction } from "express";
import { Response } from "express";
import { Request } from "express";
import AppError from "../utils/AppError";
import * as bcrypt from "bcryptjs";
import { User } from "../entity/user";
import { AppDataSource } from "../data-source";

interface RequestCustom extends Request {
  User: any;
}

const UserRepo = AppDataSource.getRepository(User);
// To register super admin
export const userRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { email, role, password } = req.body;
    await bcrypt
      .hash(password, 10)
      .then((hash) => {
        UserRepo.save({
          email: email,
          password: hash,
          role: role,
        })
          .then((result) => {
            res.status(200).json({
              status: "success",
              result,
              password,
            });
          })
          .catch((error) => {
            next(new AppError(error.statusCode, "Password cannot generated"));
          });
      })
      .catch((error) => {
        next(new AppError(error.statusCode, "Password cannot generated"));
      });
  } catch (error) {
    next(new AppError(error.statusCode, error.message));
  }
};
