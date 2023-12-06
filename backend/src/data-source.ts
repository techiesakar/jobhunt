require("dotenv").config();
import "reflect-metadata";
import { DataSource } from "typeorm";

import { User } from "./entity/user";
import { Staff } from "./entity/staff";

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
  entities: [Staff, User],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscribe/**/*.ts"],
});
