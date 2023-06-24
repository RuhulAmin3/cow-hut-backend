import express from "express";
import { validationRequest } from "../../middlewares/validationRequest";
import { loginUserZodSchema, userSignupZodSchema } from "./auth.validation";
import { createUserController, loginUserController } from "./auth.controller";

const router = express.Router();

router.post(
  "/signup",
  validationRequest(userSignupZodSchema),
  createUserController
);

router.post(
  "/auth/login",
  validationRequest(loginUserZodSchema),
  loginUserController
);
router.post("/refresh-token");

export default router;
