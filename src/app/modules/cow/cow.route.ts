import express from "express";
import {
  createCowController,
  deleteCowController,
  getAllCowController,
  getSingleCowController,
  updateCowController,
} from "./cow.controller";
import { validationRequest } from "../../middlewares/validationRequest";
import { createCowZodSchema, updateCowZodSchema } from "./cow.validation";

const router = express.Router();

router.post("/", validationRequest(createCowZodSchema), createCowController);
router.get("/:id", getSingleCowController);
router.patch("/:id", updateCowController);
router.delete(
  "/:id",
  validationRequest(updateCowZodSchema),
  deleteCowController
);

router.get("/", getAllCowController);

export default router;
