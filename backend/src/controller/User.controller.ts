require("dotenv").config();
import { NextFunction } from "express";
import { Response } from "express";
import { Request } from "express";
import AppError from "../utils/AppError";
import * as generatePassword from "generate-password";
import * as bcrypt from "bcryptjs";
import * as jsonwebtoken from "jsonwebtoken";
import { User } from "../entity/user";
import { AppDataSource } from "../data-source";
import MailTemplate from "../view/mail-template";
import SendMail from "../utils/Mail";
import { client } from "../lib/redis";

interface RequestCustom extends Request {
  User: any;
}

const UserRepo = AppDataSource.getRepository(User);
// To register super admin
export const adminRegister = async (
  // User created - if cms admin added company profile
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { company_code, email, role } = req.body;
    let password = generatePassword.generate({
      uppercase: true,
      lowercase: true,
      length: 10,
      symbols: false,
      numbers: true,
    });
    await bcrypt
      .hash(password, 10)
      .then((hash) => {
        UserRepo.save({
          company_code: company_code,
          email: email,
          password: hash,
          role: role,
        })
          .then((result) => {
            res.status(200).json({
              status: "success",
              result,
              password,
            });
          })
          .catch((error) => {
            next(new AppError(error.statusCode, "Password cannot generated"));
          });
      })
      .catch((error) => {
        next(new AppError(error.statusCode, "Password cannot generated"));
      });

    req.body.password = password;
    req.body.role = "admin";
    try {
      const message = `Your password is ${password}`;
      const options = {
        from: "Jobhunt <techiesakar@gmail.com",
        to: email,
        subject: "Password",
        text: message,
        html: MailTemplate(message),
      };
      SendMail(options, () => {
        return console.log("Email has been sent");
      });
    } catch (error) {
      next(new AppError(error.statusCode, "Password cannot be sent"));
    }
  } catch (error) {
    next(new AppError(error.statusCode, error.message));
  }
};

export const UserRegisterHandler = async (
  // User created - if cms admin added company profile
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { company_code, company_email, role, password } = req.body;
    await bcrypt
      .hash(password, 10)
      .then((hash) => {
        UserRepo.save({
          company_code: company_code,
          email: company_email,
          password: hash,
          role: role,
        })
          .then((result) => {
            res.status(200).json({
              status: "success",
              result,
              password,
            });
          })
          .catch((error) => {
            next(new AppError(error.statusCode, "Password cannot generated"));
          });
      })
      .catch((error) => {
        next(new AppError(error.statusCode, "Password cannot generated"));
      });
  } catch (error) {
    next(new AppError(error.statusCode, error.message));
  }
};

// Super Admin owner Login
export const adminLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await UserRepo.findOneBy({
      email: email,
      role: "super-admin",
    });
    if (!user) {
      return next(new AppError(401, "Invalid Email or Password"));
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return next(new AppError(401, "Invalid Email or Password"));
    }
    generateToken(user, res);
  } catch (error) {
    return next(new AppError(500, "Something went wrong"));
  }
};

// Company Login
export const companyLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { email, password } = req.body;

    let user = await UserRepo.findOneBy({
      email: email,
      role: "admin",
    });
    if (!user) {
      return next(new AppError(404, "User not found"));
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return next(new AppError(401, "Invalid Email or Password"));
    }
    generateToken(user, res);
  } catch (error) {
    return next(new AppError(500, "Something went wrong"));
  }
};

// Admin patch handler - Password or profile details
export const adminPatchHandler = async (
  req: RequestCustom,
  res: Response,
  next: NextFunction
) => {
  try {
    const { oldPassword, password } = req.body;

    if (oldPassword === password) {
      return res.status(400).json({
        status: "fail",
        message: "New password cannot be same as old password",
      });
    }

    // Hash the provided old password and compare it directly
    const user = await UserRepo.findOneBy({
      id: req.User.id,
    });

    if (user) {
      const isPasswordValid = bcrypt.compareSync(oldPassword, user.password);

      if (isPasswordValid) {
        const hashedNewPassword = bcrypt.hashSync(password, 10);
        user.password = hashedNewPassword;
        await UserRepo.save(user);
        return res
          .status(200)
          .json({ message: "Password updated successfully" });
      } else {
        return res.status(401).json({ message: "Old password is incorrect" });
      }
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return next(new AppError(error.statusCode, error.message));
  }
};

// To verify token for login
export const verifyToken = async (
  req: RequestCustom,
  res: Response,
  next: NextFunction
) => {
  try {
    const cashedData = await client.get(req.User.id);

    if (cashedData) {
      res.status(200).json({
        status: "success",
      });
    } else {
      res.clearCookie("token");
      return next();
    }
  } catch (error) {
    return next(new AppError(500, "Something went wrong"));
  }
};

// To remove token when logout
export const Logout = async (
  req: RequestCustom,
  res: Response,
  next: NextFunction
) => {
  try {
    const userID = req.User.id;
    res.clearCookie("token");
    client.del(userID, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Deleted from Redis");
      }
    });
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    return next(new AppError(error.statusCode, error.message));
  }
};

// Generate Token
const generateToken = async (user: User, res: Response) => {
  const accessToken = jsonwebtoken.sign(
    {
      id: user.id,
      email: user.email,
      company_code: user.company_code,
      role: user.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "2h",
    }
  );

  const refreshToken = jsonwebtoken.sign(
    { id: user.id },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "6h",
    }
  );
  console.log(accessToken, "This is access token");
  console.log(refreshToken, "This is refresh token");

  res.cookie("jobhunt-access-token", accessToken, {
    maxAge: 60 * 60 * 2000,
    sameSite: "strict",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  res.cookie("jobhunt-refresh-token", refreshToken, {
    maxAge: 60 * 60 * 1000 * 6,
    sameSite: "strict",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  // For Redis
  const currentTime = new Date().getTime();
  client.set(user.id, currentTime, "EX", 60 * 60 * 1000);
  res.status(200).json({
    status: "success",
    token: accessToken,
  });
};

// Refresh token
