import { Router } from "express";
import {
  deleteHandler,
  getAllHandler,
  getSingleHandler,
  patchHandler,
  postHandler,
} from "../controller/Technology.controller";

const router = Router();
router.route("/").get(getAllHandler).post(postHandler);

router
  .route("/:id")
  .get(getSingleHandler)
  .patch(patchHandler)
  .delete(deleteHandler);

export default router;
