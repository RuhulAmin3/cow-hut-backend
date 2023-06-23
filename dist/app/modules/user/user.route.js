"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validationRequest_1 = require("./../../middlewares/validationRequest");
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
router.post("/auth/signup", (0, validationRequest_1.validationRequest)(user_validation_1.userZodSchema), user_controller_1.createUserController);
router.get("/users/:id", user_controller_1.getSingleUserController);
router.patch("/users/:id", (0, validationRequest_1.validationRequest)(user_validation_1.updateUserZodSchema), user_controller_1.updateUserController);
router.delete("/users/:id", user_controller_1.deleteUserController);
router.get("/users", user_controller_1.getAllUserController);
exports.default = router;
