"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validationRequest_1 = require("./../../middlewares/validationRequest");
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const auth_1 = require("../../middlewares/auth");
const enum_1 = require("../../../enums/enum");
const router = express_1.default.Router();
router.get("/", (0, auth_1.auth)(enum_1.USER_ROLE.ADMIN), user_controller_1.getAllUserController);
router.get("/my-profile", (0, auth_1.auth)(enum_1.USER_ROLE.BUYER, enum_1.USER_ROLE.SELLER), user_controller_1.profileController);
router.patch("/my-profile", (0, validationRequest_1.validationRequest)(user_validation_1.updateProfileZodSchema), (0, auth_1.auth)(enum_1.USER_ROLE.BUYER, enum_1.USER_ROLE.SELLER), user_controller_1.updateProfileController);
router.get("/:id", (0, auth_1.auth)(enum_1.USER_ROLE.ADMIN), user_controller_1.getSingleUserController);
router.patch("/:id", (0, validationRequest_1.validationRequest)(user_validation_1.updateUserZodSchema), (0, auth_1.auth)(enum_1.USER_ROLE.ADMIN), user_controller_1.updateUserController);
router.delete("/:id", (0, auth_1.auth)(enum_1.USER_ROLE.ADMIN), user_controller_1.deleteUserController);
exports.default = router;
