import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";
import { Location } from "../entity/Location";
const LocationRepo = AppDataSource.getRepository(Location);
interface RequestCustom extends Request {
  User: any;
}
export const getAllHandler = async (
  req: RequestCustom,
  res: Response,
  next: NextFunction
) => {
  try {
    let result = await LocationRepo.find({
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
    let result = await LocationRepo.findOneBy({
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
  req: RequestCustom,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.User);
    await LocationRepo.save(req.body)
      .then((result) => {
        res.status(200).json({
          message: "Location has been added",
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
        message: "Location with that name already exist",
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
    let location = await LocationRepo.findOneBy({ id: req.params.id });
    if (!location) {
      return next(new AppError(404, "Location with this id not found"));
    }

    Object.assign(location, req.body);
    await LocationRepo.save(location)
      .then((result) => {
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
        message: "Location with that name already exist",
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
    let location = await LocationRepo.findOneBy({ id: req.params.id });
    if (!location) {
      return next(new AppError(404, "Location with this id not found"));
    }
    await LocationRepo.remove(location)
      .then((result: any) => {
        console.log(result);
        res.status(200).json({
          message: "Location has beed deleted successfully",
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
