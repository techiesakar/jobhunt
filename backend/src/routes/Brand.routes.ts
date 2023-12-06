import { Router } from "express";
import { upload } from "../utils/UploadFile";
import {
  deleteHandler,
  getAllHandler,
  getSingleHandler,
  patchHandler,
  postHandler,
} from "../controller/Brand.controller";

const router = Router();
router
  .route("/")
  .post(upload.single("image"), postHandler)

  .get(getAllHandler);

router
  .route("/:id")
  .get(getSingleHandler)
  .patch(upload.single("image"), patchHandler)
  .delete(deleteHandler);

export default router;
