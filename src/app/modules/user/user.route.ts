import { validationRequest } from "./../../middlewares/validationRequest";
import express from "express";
import {
  getAllUserController,
  getSingleUserController,
  updateUserController,
  deleteUserController,
} from "./user.controller";
import { updateUserZodSchema } from "./user.validation";
import { auth } from "../../middlewares/auth";
import { USER_ROLE } from "../../../enums/enum";
const router = express.Router();

router.get("/:id", auth(USER_ROLE.ADMIN), getSingleUserController);
router.patch(
  "/users/:id",
  validationRequest(updateUserZodSchema),
  auth(USER_ROLE.ADMIN),
  updateUserController
);
router.delete("/:id", auth(USER_ROLE.ADMIN), deleteUserController);
router.get("/", auth(USER_ROLE.ADMIN), getAllUserController);

export default router;
