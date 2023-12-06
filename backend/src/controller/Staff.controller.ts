import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Staff } from "../entity/staff";

const staffRepo = AppDataSource.getRepository(Staff);

export const registerStaff = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await staffRepo.save(req.body);
};
