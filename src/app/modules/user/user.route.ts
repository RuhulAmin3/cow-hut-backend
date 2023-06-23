import { validationRequest } from "./../../middlewares/validationRequest";
import express from "express";
import {
  createUserController,
  getAllUserController,
  getSingleUserController,
  updateUserController,
  deleteUserController,
} from "./user.controller";
import { updateUserZodSchema, userZodSchema } from "./user.validation";
const router = express.Router();

router.post(
  "/auth/signup",
  validationRequest(userZodSchema),
  createUserController
);
router.get("/users/:id", getSingleUserController);
router.patch(
  "/users/:id",
  validationRequest(updateUserZodSchema),
  updateUserController
);
router.delete("/users/:id", deleteUserController);
router.get("/users", getAllUserController);

export default router;
