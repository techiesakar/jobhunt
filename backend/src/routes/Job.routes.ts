import { Router } from "express";
import {
  deleteHandler,
  getAllHandler,
  getSingleHandler,
  postHandler,
} from "../controller/Job.controller";
import { upload } from "../utils/UploadFile";
import { Auth } from "../utils/ValidateRoutes";
const router = Router();
router.route("/").get(getAllHandler);

router.route("/submit-job").post(Auth, upload.single("job_image"), postHandler);
router.route("/:id").delete(deleteHandler);
router.route("/:id").get(getSingleHandler);

export default router;
