import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Brand } from "../entity/Brand";
import AppError from "../utils/AppError";
const BrandRepo = AppDataSource.getRepository(Brand);

export const getAllHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let result = await BrandRepo.find({
      order: {
        createdAt: "ASC",
      },
    });

    res.status(200).json({
      status: "success",
      result,
    });
  } catch (err) {
    next(err);
  }
};

export const getSingleHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let result = await BrandRepo.findOneBy({
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
    console.log(req.body, req.file);
    req.body.image = req.file.filename;

    const result = await BrandRepo.save(req.body);
    res.status(200).json({
      message: "Brand has been added successfully",
      result,
    });
  } catch (error) {
    // Handle database errors
    if (error.code === "23505") {
      return res.status(409).json({
        status: "fail",
        msg: error.message,
        message: "Brand with that name already exist",
      });
    }
    // Handle other errors
    console.log("Error creating Brand: ", error);
    if (error.code === "500") {
      res.status(500).json({
        status: "error",
        message: "An error occurred while creating the brand",
        msg: error.message,
      });
    }
    next(error);
  }
};

export const patchHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body, req.file);
    let result = await BrandRepo.findOneBy({ id: req.params.id });

    if (!result) {
      return next(new AppError(404, "Brand with this id not found"));
    }

    console.log(req.body);
    Object.assign(result, req.body);

    const updatedBrand = await BrandRepo.save(result);
    console.log(updatedBrand);

    res.status(200).json({
      message: "Brand has been updated successfully",
      updatedBrand,
    });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({
        status: "fail",
        msg: error.message,
        message: "Brand with that name already exist",
      });
    }
    if (error.code === "500") {
      return res.status(500).json({
        status: "error",
        message: "Brand with that name already exist",
        msg: error.message,
      });
    }
  }
};

export const deleteHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let brand = await BrandRepo.findOneBy({ id: req.params.id });
    if (!brand) {
      return next(new AppError(404, "Brand with this id not found"));
    }
    const result = await BrandRepo.remove(brand);
    console.log(result);
    res.status(200).json({
      message: "Brand has been deleted successfully",
      result,
    });
  } catch (error: any) {
    next(new AppError(error.statusCode, error.message));
  }
};
