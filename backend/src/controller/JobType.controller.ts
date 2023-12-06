import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";
import { JobType } from "../entity/JobType";
const JobTypeRepo = AppDataSource.getRepository(JobType);

export const getAllHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let result = await JobTypeRepo.find();
    res.status(200).json({
      status: "success",
      result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getSingleHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let result = await JobTypeRepo.findOneBy({
      id: req.params.id,
    });
    res.status(200).json({
      status: "success",
      result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const postHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = JobTypeRepo.save(req.body);
    res.status(200).json({
      status: "success",
      result,
    });
  } catch (error) {
    next(new AppError(error.statusCode, error.message));
  }
};

export const patchHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let jobtypes = await JobTypeRepo.findOneBy({ id: req.params.id });
    if (!jobtypes) {
      return next(new AppError(404, "JobType with this id not found"));
    }
    Object.assign(jobtypes, req.body);
    const result = await JobTypeRepo.save(jobtypes);
    if (result) {
      res.status(200).json({
        status: "success",
        result,
      });
    }
  } catch (error) {
    return next(new AppError(404, "Cannot update JobType"));
  }
};

export const deleteHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let jobtypes = await JobTypeRepo.findOneBy({ id: req.params.id });
    if (!jobtypes) {
      return next(new AppError(404, "JobType with this id not found"));
    }
    const result = await JobTypeRepo.remove(jobtypes);
    res.status(200).json({
      status: "success",
      result,
    });
  } catch (error: any) {
    next(new AppError(error.statusCode, error.message));
  }
};
