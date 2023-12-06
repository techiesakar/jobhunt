import { Router } from "express";
import {
  deleteHandler,
  getAllHandler,
  getSingleHandler,
  patchHandler,
  postHandler,
} from "../controller/Benefit.controller";

const router = Router();
router.route("/").post(postHandler).get(getAllHandler);
router
  .route("/:id")
  .get(getSingleHandler)
  .patch(patchHandler)
  .delete(deleteHandler);

export default router;
