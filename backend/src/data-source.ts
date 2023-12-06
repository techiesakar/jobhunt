require("dotenv").config();
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Skill } from "./entity/Skill";
import { Category } from "./entity/Category";
import { JobType } from "./entity/JobType";
import { Technology } from "./entity/Technology";
import { Location } from "./entity/Location";
import { Benefit } from "./entity/Benefit";
import { Company } from "./entity/Company";
import { Brand } from "./entity/Brand";
import { Job } from "./entity/Job";
import { User } from "./entity/user";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  ssl: false,
  entities: [
    Skill,
    Category,
    JobType,
    Technology,
    Location,
    Benefit,
    Company,
    Brand,
    Job,
    User,
  ],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscribe/**/*.ts"],
});
