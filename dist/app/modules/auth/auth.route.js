"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validationRequest_1 = require("../../middlewares/validationRequest");
const auth_validation_1 = require("./auth.validation");
const auth_controller_1 = require("./auth.controller");
const router = express_1.default.Router();
router.post("/signup", (0, validationRequest_1.validationRequest)(auth_validation_1.userSignupZodSchema), auth_controller_1.createUserController);
router.post("/login", (0, validationRequest_1.validationRequest)(auth_validation_1.loginUserZodSchema), auth_controller_1.loginUserController);
router.post("/refresh-token", (0, validationRequest_1.validationRequest)(auth_validation_1.refreshTokenZodSchema), auth_controller_1.refreshTokenController);
exports.default = router;
