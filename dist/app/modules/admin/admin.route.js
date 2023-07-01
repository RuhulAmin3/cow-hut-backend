"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("./admin.controller");
const validationRequest_1 = require("../../middlewares/validationRequest");
const admin_validation_1 = require("./admin.validation");
const enum_1 = require("../../../enums/enum");
const auth_1 = require("../../middlewares/auth");
const router = express_1.default.Router();
router.post("/create-admin", (0, validationRequest_1.validationRequest)(admin_validation_1.createAdminZodSchema), admin_controller_1.createAdminController);
router.post("/login", (0, validationRequest_1.validationRequest)(admin_validation_1.adminLoginZodSchema), admin_controller_1.adminLoginController);
router.patch("/my-profile", (0, validationRequest_1.validationRequest)(admin_validation_1.updateAdminProfileZodSchema), (0, auth_1.auth)(enum_1.USER_ROLE.ADMIN), admin_controller_1.updateAdminProfileController);
router.get("/my-profile", (0, auth_1.auth)(enum_1.USER_ROLE.ADMIN), admin_controller_1.getAdminProfileController);
exports.default = router;
