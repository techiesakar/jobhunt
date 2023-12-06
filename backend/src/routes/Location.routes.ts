import { Router } from "express";
import {
  deleteHandler,
  getAllHandler,
  getSingleHandler,
  patchHandler,
  postHandler,
} from "../controller/Location.controller";
import { Auth } from "../utils/ValidateRoutes";
import authUser from "../utils/Role";
const router = Router();

// router.route("/").get(Auth, authUser, getAllHandler).post(postHandler);

router.route("/").get(getAllHandler).post(postHandler);

router
  .route("/:id")
  .get(getSingleHandler)
  .patch(patchHandler)
  .delete(deleteHandler);

export default router;
