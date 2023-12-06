import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";
import { Benefit } from "../entity/Benefit";
const BenefitRepo = AppDataSource.getRepository(Benefit);

export const getAllHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let result = await BenefitRepo.find({
      order: {
        createdAt: "ASC",
      },
    });
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
    let result = await BenefitRepo.findOneBy({
      id: req.params.id,
    });
    console.log(result);
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

    await BenefitRepo.save(req.body)
      .then((result) => {
        res.status(200).json({
          message: "Benefit has been added",
          result,
        });
      })
      .catch((err) => {
        console.log(err, "here");
        res.status(500).json({
          message: "Error creating placement",
          err,
        });
      });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({
        status: "fail",
        msg: error.message,
        message: "Benefit with that name already exist",
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
    let Benefits = await BenefitRepo.findOneBy({ id: req.params.id });
    if (!Benefits) {
      return next(new AppError(404, "Benefit with this id not found"));
    }

    console.log(req.body);
    Object.assign(Benefits, req.body);
    await BenefitRepo.save(Benefits)
      .then((result) => {
        console.log(result);
        res.status(200).json({
          message: "working",
          result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Error creating placement",
          err,
        });
      });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({
        status: "fail",
        msg: error.message,
        message: "Benefit with that name already exist",
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
    let Benefits = await BenefitRepo.findOneBy({ id: req.params.id });
    if (!Benefits) {
      return next(new AppError(404, "Benefit with this id not found"));
    }
    await BenefitRepo.remove(Benefits)
      .then((result: any) => {
        console.log(result);
        res.status(200).json({
          message: "Benefit has beed deleted successfully",
          result,
        });
      })
      .catch((err: any) => {
        console.log(err);
        next(new AppError(err.statusCode, err.message));
      });
  } catch (error: any) {
    next(new AppError(error.statusCode, error.message));
  }
};
