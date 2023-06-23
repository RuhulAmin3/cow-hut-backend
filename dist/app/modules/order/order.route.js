"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const validationRequest_1 = require("../../middlewares/validationRequest");
const order_validation_1 = require("./order.validation");
const router = express_1.default.Router();
router.post("/", (0, validationRequest_1.validationRequest)(order_validation_1.orderValidationZodSchma), order_controller_1.createOrderController);
router.get("/", order_controller_1.getAllOrderController);
exports.default = router;
