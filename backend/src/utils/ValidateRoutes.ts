require("dotenv").config();
import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { client } from "../lib/redis";

export interface RequestCustom extends Request {
  User: any;
}
export const Auth = async (
  req: RequestCustom,
  res: Response,
  next: NextFunction
) => {
  try {
    // check if JWT token is present in request headers
    const cookieHeader = req.headers.cookie;
    if (!cookieHeader) {
      return next(new Error("Authorization token missing!"));
    }
    const token = cookieHeader.split("=")[1];

    // verify the JWT token
    const decodedToken = await jwt.verify(token, process.env.TOKEN_ENCRYPTION);

    // store user information in the request object
    req.User = decodedToken;

    resetInactivityTimer(req, res);
    next();
  } catch (error) {
    next(error);
  }
};

const resetInactivityTimer = async (req: RequestCustom, res: Response) => {
  const currentTime = new Date().getTime();
  const lastActiveTime = await client.get(req.User.id);
  if (lastActiveTime !== null) {
    const inActiveDuration = currentTime - parseInt(lastActiveTime);
    const inMinutes = inActiveDuration / 6000;
    if (inMinutes >= 1) {
      client.del(req.User.id, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Deleted from Redis");
        }
      });
    } else {
      client.set(req.User.id, currentTime, "EX", 1000);
    }
  }
};
