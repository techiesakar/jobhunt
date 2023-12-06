import AppError from "../utils/AppError";
import { AppDataSource } from "../data-source";
import { Category } from "../entity/Category";
import { Response, Request, NextFunction } from "express";
import { Between, Like } from "typeorm";

const CategoryRepo = AppDataSource.getRepository(Category);

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
      result = await CategoryRepo.find({
        where: {
          name: Like(`%${search}%`),
          createdAt: Between(start, end),
        },
        order: {
          createdAt: sort === "asc" ? "ASC" : "DESC",
        },
      });
    } else {
      result = await CategoryRepo.find();
    }

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
    await CategoryRepo.findOneBy({ id: req.params.id })
      .then((result) => {
        res.status(200).json({
          message: "category has been fetched",
          result,
        });
      })
      .catch((err) => {
        next(new AppError(500, err.message));
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
    if (req.file) {
      console.log(req.body);
      req.body.image = req.file.filename;
    }

    const result = await CategoryRepo.save(req.body);
    if (result) {
      console.log(req.body);
      res.status(200).json({
        status: "success",
        result,
      });
    }
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
    let Category = await CategoryRepo.findOneBy({ id: req.params.id });
    if (!Category) {
      return next(new AppError(404, "category with this id not found"));
    }

    if (req.file) {
      req.body.image = req.file.filename;
    }

    Object.assign(Category, req.body);
    await CategoryRepo.save(Category)
      .then((result) => {
        res.status(200).json({
          message: "category has been updated",
          result,
        });
      })
      .catch((err) => {
        next(new AppError(500, err.message));
      });
  } catch (error) {
    next(new AppError(error.statusCode, error.message));
  }
};

export const deleteHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let Category = await CategoryRepo.findOneBy({ id: req.params.id });
    if (!Category) {
      return next(new AppError(404, "category with this id not found"));
    }
    await CategoryRepo.remove(Category)
      .then((result) => {
        res.status(200).json({
          message: "Category has been deleted",
          result,
        });
      })
      .catch((err) => {
        next(new AppError(500, err.message));
      });
  } catch (error) {
    next(new AppError(error.statusCode, error.message));
  }
};
