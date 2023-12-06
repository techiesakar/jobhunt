require("dotenv").config();

import { Redis } from "ioredis";
import AppError from "../utils/AppError";

const getRedisUrl = () => {
  if (process.env.REDIS_URL) {
    return process.env.REDIS_URL;
  }
  throw new AppError(500, "REDIS_URL is not set");
};

export const client = new Redis(getRedisUrl());
