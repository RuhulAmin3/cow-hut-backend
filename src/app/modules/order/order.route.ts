import express from "express";
import {
  createOrderController,
  getAllOrderController,
} from "./order.controller";
import { validationRequest } from "../../middlewares/validationRequest";
import { orderValidationZodSchma } from "./order.validation";

const router = express.Router();

router.post(
  "/",
  validationRequest(orderValidationZodSchma),
  createOrderController
);
router.get("/", getAllOrderController);
export default router;
