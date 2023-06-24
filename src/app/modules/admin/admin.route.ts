import express from "express";
import {
  adminLoginController,
  createAdminController,
} from "./admin.controller";
import { validationRequest } from "../../middlewares/validationRequest";
import { adminLoginZodSchema, createAdminZodSchema } from "./admin.validation";
const router = express.Router();

router.post(
  "/create-admin",
  validationRequest(createAdminZodSchema),
  createAdminController
);
router.post(
  "/login",
  validationRequest(adminLoginZodSchema),
  adminLoginController
);

export default router;
