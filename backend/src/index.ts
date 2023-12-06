import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "./data-source";
import { port } from "./config";
import AppError from "./utils/AppError";
import * as cors from "cors";
import * as morgan from "morgan";
import * as swaggerUiExpress from "swagger-ui-express";

// routes import
import BrandRoute from "./routes/Brand.routes";
import LocationRoute from "./routes/Location.routes";
import BenefitRoute from "./routes/Benefit.routes";
import CategoryRoute from "./routes/Category.routes";
import JobTypeRoute from "./routes/JobType.routes";
import TechnologyRoute from "./routes/Technology.routes";
import CompanyRoute from "./routes/Company.routes";
import UserRoute from "./routes/User.routes";

import SkillRoute from "./routes/Skill.routes";
import JobRoute from "./routes/Job.routes";
import MailRoute from "./routes/Mail.routes";
import { apiDocumentation } from "./swagger/swaggerConfig";

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(
      cors({
        credentials: true,
        origin: ["http://localhost:3000", "http://localhost:5173"],
      })
    );
    app.use("/public", express.static("src/Public"));
    app.use(morgan("dev"));

    app.use("/public", express.static("src/public"));

    app.use(
      "/doc",
      swaggerUiExpress.serve,
      swaggerUiExpress.setup(apiDocumentation)
    );

    // Main route
    app.get("/", (req: Request, res: Response) => {
      res.status(200).json({
        message: "working",
      });
    });

    // Routes
    app.use("/jobInfo", BrandRoute);
    app.use("/skill", SkillRoute);
    app.use("/category", CategoryRoute);
    app.use("/jobtype", JobTypeRoute);
    app.use("/technology", TechnologyRoute);
    app.use("/location", LocationRoute);
    app.use("/benefit", BenefitRoute);
    app.use("/company", CompanyRoute);

    app.use("/job", JobRoute);

    app.use("/mail", MailRoute);
    app.use("/auth", UserRoute);

    // unhandled routes
    app.all("*", (req: Request, res: Response, next: NextFunction) => {
      next(new AppError(404, `Route ${req.originalUrl} not found`));
    });

    // Global Error Handler
    app.use(
      (error: AppError, req: Request, res: Response, next: NextFunction) => {
        error.status = error.status || "error";
        error.statusCode = error.statusCode || 500;

        res.status(error.statusCode).json({
          status: error.status,
          message: error.message,
        });
      }
    );

    // start express server
    app.listen(port, () =>
      console.log("Express server has started on port: " + port)
    );
  })
  .catch((error) => console.log(error));
