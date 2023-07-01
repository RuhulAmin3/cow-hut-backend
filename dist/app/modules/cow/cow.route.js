"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cow_controller_1 = require("./cow.controller");
const validationRequest_1 = require("../../middlewares/validationRequest");
const cow_validation_1 = require("./cow.validation");
const auth_1 = require("../../middlewares/auth");
const enum_1 = require("../../../enums/enum");
const router = express_1.default.Router();
router.post("/", (0, validationRequest_1.validationRequest)(cow_validation_1.createCowZodSchema), (0, auth_1.auth)(enum_1.USER_ROLE.SELLER), cow_controller_1.createCowController);
router.get("/:id", (0, auth_1.auth)(enum_1.USER_ROLE.ADMIN, enum_1.USER_ROLE.SELLER, enum_1.USER_ROLE.BUYER), cow_controller_1.getSingleCowController);
router.patch("/:id", (0, auth_1.auth)(enum_1.USER_ROLE.SELLER), cow_controller_1.updateCowController);
router.delete("/:id", (0, validationRequest_1.validationRequest)(cow_validation_1.updateCowZodSchema), (0, auth_1.auth)(enum_1.USER_ROLE.SELLER), cow_controller_1.deleteCowController);
router.get("/", (0, auth_1.auth)(enum_1.USER_ROLE.ADMIN, enum_1.USER_ROLE.SELLER, enum_1.USER_ROLE.BUYER), cow_controller_1.getAllCowController);
exports.default = router;
