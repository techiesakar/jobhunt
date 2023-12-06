import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Job } from "../entity/Job";
import AppError from "../utils/AppError";
import { Benefit } from "../entity/Benefit";
import { Category } from "../entity/Category";
import { Company } from "../entity/Company";
import { Location } from "../entity/Location";
import { Technology } from "../entity/Technology";
import { In } from "typeorm";
import { Skill } from "../entity/Skill";
import { JobType } from "../entity/JobType";

const JobRepo = AppDataSource.getRepository(Job);
const JobTypeRepo = AppDataSource.getRepository(JobType);
const BenefitRepo = AppDataSource.getRepository(Benefit);
const CategoryRepo = AppDataSource.getRepository(Category);
const CompanyRepo = AppDataSource.getRepository(Company);
const LocationRepo = AppDataSource.getRepository(Location);
const TechnologyRepo = AppDataSource.getRepository(Technology);

const SkillRepo = AppDataSource.getRepository(Skill);

interface RequestCustom extends Request {
  User: any;
}

export const getAllHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const jobs = await JobRepo.find({
      relations: {
        company: true,
        jobtypes: true,
        categories: true,
        skills: true,
        technologies: true,
        benefits: true,
        locations: true,
      },
    });

    res.status(200).json({
      status: "success",
      result: jobs,
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
    let Job = await JobRepo.findOneBy({ id: req.params.id });
    if (!Job) {
      return next(new AppError(404, "category with this id not found"));
    }
    await JobRepo.remove(Job)
      .then((result) => {
        res.status(200).json({
          message: "Job has been deleted",
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

export const getSingleHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await JobRepo.findOne({
      where: { id: req.params.id },
      relations: {
        company: true,
        jobtypes: true,
        categories: true,
        skills: true,
        technologies: true,
        benefits: true,
        locations: true,
      },
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
    if (req.file) {
      req.body.job_image = req.file.filename;
    }
    let selectedCompany;
    if (req.User.role == "super-admin") {
      console.log("I'am super-admin");
      selectedCompany = await CompanyRepo.findOneBy({
        id: req.body.company_name,
      });
    } else if (req.User.role == "admin") {
      console.log("I'am admin");
      selectedCompany = await CompanyRepo.findOneBy({
        company_code: req.User.company_code,
      });
      console.log(selectedCompany);
    }

    if (!selectedCompany) {
      return next(new AppError(400, "Please select a company"));
    }

    req.body.job_email = selectedCompany.company_email;
    req.body.job_phone = selectedCompany.company_phone;

    const selectedJobTypes = await JobTypeRepo.find({
      where: {
        id: In([...JSON.parse(req.body.job_types)]),
      },
    });

    const selectedCategories = await CategoryRepo.find({
      where: {
        id: In([...JSON.parse(req.body.job_categories)]),
      },
    });
    if (!selectedCategories.length) {
      return next(new AppError(400, "Please select at least one category"));
    }

    const selectedSkills = await SkillRepo.find({
      where: {
        id: In([...JSON.parse(req.body.job_skills)]),
      },
    });
    const selectedTechnologies = await TechnologyRepo.find({
      where: {
        id: In([...JSON.parse(req.body.job_technologies)]),
      },
    });
    const selectedBenefits = await BenefitRepo.find({
      where: {
        id: In([...JSON.parse(req.body.job_benefits)]),
      },
    });
    const selectedLocations = await LocationRepo.find({
      where: {
        id: In([...JSON.parse(req.body.job_locations)]),
      },
    });
    if (!selectedLocations.length) {
      return next(new AppError(400, "Please select at least one location"));
    }
    req.body.company = selectedCompany;
    req.body.locations = selectedLocations;
    req.body.benefits = selectedBenefits;
    req.body.technologies = selectedTechnologies;
    req.body.categories = selectedCategories;
    req.body.skills = selectedSkills;
    req.body.jobtypes = selectedJobTypes;

    const result = await JobRepo.save(req.body);
    console.log(result);
    if (result) {
      res.status(200).json({
        status: "success",
        result,
      });
    }
  } catch (error) {
    next(new AppError(error.statusCode, error.message));
  }
};
