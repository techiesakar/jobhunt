import AppError from "../utils/AppError";
import { AppDataSource } from "../data-source";
import { Response, Request, NextFunction } from "express";
import { Company } from "../entity/Company";
import { In } from "typeorm";
import { Location } from "../entity/Location";
import { Benefit } from "../entity/Benefit";
import { Technology } from "../entity/Technology";
import { Category } from "../entity/Category";
import * as generatePassword from "generate-password";

import { UserRegisterHandler } from "./User.controller";
const BenefitRepo = AppDataSource.getRepository(Benefit);
const CategoryRepo = AppDataSource.getRepository(Category);
const CompanyRepo = AppDataSource.getRepository(Company);
const LocationRepo = AppDataSource.getRepository(Location);
const TechnologyRepo = AppDataSource.getRepository(Technology);
interface RequestCustom extends Request {
  User: any;
}
export const postHandler = async (
  // Create company account from - Employeer Site
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let companyCode = generatePassword.generate({
      uppercase: true,
      lowercase: true,
      length: 10,
      symbols: false,
      numbers: true,
    });
    if (req.file) {
      req.body.image = req.file.filename;
    }
    const selectedLocations = await LocationRepo.find({
      where: {
        id: In([...JSON.parse(req.body.company_locations)]),
      },
    });

    const selectedBenefits = await BenefitRepo.find({
      where: {
        id: In([...JSON.parse(req.body.company_benefits)]),
      },
    });

    const selectedTechnologies = await TechnologyRepo.find({
      where: {
        id: In([...JSON.parse(req.body.company_technologies)]),
      },
    });

    const selectedCategories = await CategoryRepo.find({
      where: {
        id: In([...JSON.parse(req.body.company_categories)]),
      },
    });

    req.body.social_links = JSON.parse(req.body.social_links);
    req.body.locations = selectedLocations;
    req.body.benefits = selectedBenefits;
    req.body.technologies = selectedTechnologies;
    req.body.categories = selectedCategories;
    req.body.company_code = companyCode;

    const result = await CompanyRepo.save(req.body);
    if (result) {
      UserRegisterHandler(req, res, next);
    }
  } catch (error) {
    next(new AppError(error.statusCode, error.message));
  }
};

export const getAllHandler = async (
  req: RequestCustom,
  res: Response,
  next: NextFunction
) => {
  try {
    await CompanyRepo.find({
      relations: [
        "locations",
        "benefits",
        "technologies",
        "categories",
        "jobs",
        "jobs.locations",
      ],
    })
      .then((result: any) => {
        res.status(200).json({
          status: "success",
          result,
        });
      })
      .catch((error) => {
        next(new AppError(error.statuscode, error.message));
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
    let brand = await CompanyRepo.findOneBy({ id: req.params.id });
    if (!brand) {
      return next(new AppError(404, "Brand with this id not found"));
    }
    const result = await CompanyRepo.remove(brand);
    res.status(200).json({
      message: "Brand has been deleted successfully",
      result,
    });
  } catch (error: any) {
    next(new AppError(error.statusCode, error.message));
  }
};

export const getSingleHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await CompanyRepo.findOne({
      where: { id: req.params.id },
      relations: [
        "locations",
        "benefits",
        "technologies",
        "categories",
        "jobs",
        "jobs.locations",
      ],
    });
    if (result) {
      res.status(200).json({
        status: "success",
        result,
      });
    } else {
      next(new AppError(404, "Company with this id not found"));
    }
  } catch (error) {
    next(new AppError(error.statusCode, error.message));
  }
};

// For company people
export const createCompanyHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body);

    if (req.file) {
      req.body.image = req.file.filename;
    }

    let companyCode = generatePassword.generate({
      uppercase: true,
      lowercase: true,
      length: 10,
      symbols: false,
      numbers: true,
    });
    if (req.file) {
      req.body.image = req.file.filename;
    }
    req.body.company_code = companyCode;
    req.body.role = "admin";

    const result = await CompanyRepo.save(req.body);
    if (result) {
      UserRegisterHandler(req, res, next);
    }
  } catch (error) {
    next(new AppError(error.statusCode, error.message));
  }
};
