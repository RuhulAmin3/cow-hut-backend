"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const validationRequest_1 = require("../../middlewares/validationRequest");
const order_validation_1 = require("./order.validation");
const enum_1 = require("../../../enums/enum");
const auth_1 = require("../../middlewares/auth");
const router = express_1.default.Router();
router.post("/", (0, validationRequest_1.validationRequest)(order_validation_1.orderValidationZodSchma), (0, auth_1.auth)(enum_1.USER_ROLE.BUYER), order_controller_1.createOrderController);
router.get("/:id", (0, auth_1.auth)(enum_1.USER_ROLE.BUYER, enum_1.USER_ROLE.SELLER, enum_1.USER_ROLE.ADMIN), order_controller_1.getSingleOrderController);
router.get("/", (0, auth_1.auth)(enum_1.USER_ROLE.ADMIN, enum_1.USER_ROLE.BUYER, enum_1.USER_ROLE.SELLER), order_controller_1.getAllOrderController);
exports.default = router;
