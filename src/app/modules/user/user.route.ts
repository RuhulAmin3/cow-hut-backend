import { validationRequest } from "./../../middlewares/validationRequest";
import express from "express";
import {
  getAllUserController,
  getSingleUserController,
  updateUserController,
  deleteUserController,
} from "./user.controller";
import { updateUserZodSchema } from "./user.validation";
const router = express.Router();

router.get("/:id", getSingleUserController);
router.patch(
  "/users/:id",
  validationRequest(updateUserZodSchema),
  updateUserController
);
router.delete("/:id", deleteUserController);
router.get("/", getAllUserController);

export default router;
