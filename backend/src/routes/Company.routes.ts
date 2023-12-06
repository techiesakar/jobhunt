import { Router } from "express";
import {
  createCompanyHandler,
  deleteHandler,
  getAllHandler,
  getSingleHandler,
  postHandler,
} from "../controller/Company.controller";
import { upload } from "../utils/UploadFile";
import { Auth } from "../utils/ValidateRoutes";
const router = Router();
router
  .route("/")
  // .get(Auth, getAllHandler)
  .get(getAllHandler)

  .post(upload.single("image"), postHandler);

router
  .route("/create-company")
  .post(upload.single("image"), createCompanyHandler);
router.route("/:id").get(getSingleHandler).delete(deleteHandler);

export default router;
