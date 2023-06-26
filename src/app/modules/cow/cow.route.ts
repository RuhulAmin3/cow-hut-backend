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
import { auth } from "../../middlewares/auth";
import { USER_ROLE } from "../../../enums/enum";

const router = express.Router();

router.post(
  "/",
  validationRequest(createCowZodSchema),
  auth(USER_ROLE.SELLER),
  createCowController
);
router.get(
  "/:id",
  auth(USER_ROLE.ADMIN, USER_ROLE.SELLER, USER_ROLE.BUYER),
  getSingleCowController
);
router.patch("/:id", auth(USER_ROLE.SELLER), updateCowController);
router.delete(
  "/:id",
  validationRequest(updateCowZodSchema),
  auth(USER_ROLE.SELLER),
  deleteCowController
);

router.get(
  "/",
  auth(USER_ROLE.ADMIN, USER_ROLE.SELLER, USER_ROLE.BUYER),
  getAllCowController
);

export default router;
