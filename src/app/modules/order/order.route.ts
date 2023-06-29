import express from "express";
import {
  createOrderController,
  getAllOrderController,
  getSingleOrderController,
} from "./order.controller";
import { validationRequest } from "../../middlewares/validationRequest";
import { orderValidationZodSchma } from "./order.validation";
import { USER_ROLE } from "../../../enums/enum";
import { auth } from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/",
  validationRequest(orderValidationZodSchma),
  auth(USER_ROLE.BUYER),
  createOrderController
);
router.get(
  "/:id",
  auth(USER_ROLE.BUYER, USER_ROLE.SELLER, USER_ROLE.ADMIN),
  getSingleOrderController
);
router.get(
  "/",
  auth(USER_ROLE.ADMIN, USER_ROLE.BUYER, USER_ROLE.SELLER),
  getAllOrderController
);
export default router;
