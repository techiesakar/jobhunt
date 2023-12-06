import { Router } from "express";
import {
  Logout,
  UserRegisterHandler,
  adminLogin,
  adminPatchHandler,
  adminRegister,
  companyLogin,
  verifyToken,
} from "../controller/User.controller";
import { Auth } from "../utils/ValidateRoutes";

const router = Router();
// router.route("/login").post(Login);

router.route("/superlogin").post(adminLogin);

router.route("/companylogin").post(companyLogin);

router.route("/verifytoken").get(Auth, verifyToken);

router.route("/register").post(UserRegisterHandler);

router.route("/adminregister").post(adminRegister);

router.route("/adminupdate").patch(Auth, adminPatchHandler);

router.route("/logout").get(Auth, Logout);

export default router;
