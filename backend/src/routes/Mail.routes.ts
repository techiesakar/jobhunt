import { Router } from "express";
import { getHandler } from "../controller/Mail.controller";

const router = Router();

router.route("/").get(getHandler);
export default router;
