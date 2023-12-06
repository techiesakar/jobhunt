import { Router } from "express";
import {
  deleteHandler,
  getAllHandler,
  getSingleHandler,
  patchHandler,
  postHandler,
} from "../controller/Category.controller";
import { upload } from "../utils/UploadFile";

const router = Router();
router.route("/").post(upload.single("image"), postHandler).get(getAllHandler);

router.route("/:id").patch(upload.single("image"), patchHandler);
router.route("/:id").get(getSingleHandler).delete(deleteHandler);

export default router;
