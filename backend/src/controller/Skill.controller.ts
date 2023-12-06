import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";
import { AppDataSource } from "../data-source";
import { Skill } from "../entity/Skill";
import { Between, Equal, Like } from "typeorm";
const skillRepository = AppDataSource.getRepository(Skill);

export const getAllHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { search, sort, startDate, endDate } = req.query;
    let result: any;
    if (startDate && endDate && search) {
      let start = new Date(startDate.toString());
      let end = new Date(endDate.toString());
      result = await skillRepository.find({
        where: {
          name: Like(`%${search}%`),
          createdAt: Between(start, end),
        },
        order: {
          createdAt: sort === "asc" ? "ASC" : "DESC",
        },
      });
    } else {
      result = await skillRepository.find();
    }

    res.status(200).json({
      status: "success",
      result,
    });
  } catch (error) {
    next(new AppError(error.statusCode, error.message));
  }
};

export const postHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await skillRepository.save(req.body);
    res.status(200).json({
      status: "success",
      result,
    });
  } catch (error) {
    next(new AppError(error.statusCode, error.message));
  }
};

export const getSingleHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let technologies = await skillRepository.findOneBy({
      id: req.params.id,
    });
    console.log(technologies);
    res.status(200).json({
      status: "success",
      technologies,
    });
  } catch (err: any) {
    next(err);
  }
};

export const patchHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const skill = await skillRepository.findOneBy({ id: req.params.id });
    if (!skill) {
      return next(new AppError(404, "Skill with ID not exists"));
    }
    Object.assign(skill, req.body);
    const result = await skillRepository.save(skill);
    res.status(200).json({
      status: "success",
      result,
    });
  } catch (error: any) {
    next(new AppError(error.statusCode, error.message));
  }
};

export const deleteHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const skill = await skillRepository.findOneBy({ id: req.params.id });
    if (!skill) {
      return next(new AppError(404, "skill with this di doesn't exist"));
    }
    const result = await skillRepository.remove(skill);
    res.status(200).json({
      status: "success",
      result,
    });
  } catch (error: any) {
    next(new AppError(error.statusCode, error.message));
  }
};
