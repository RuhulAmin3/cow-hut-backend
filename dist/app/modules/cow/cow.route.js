"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cow_controller_1 = require("./cow.controller");
const validationRequest_1 = require("../../middlewares/validationRequest");
const cow_validation_1 = require("./cow.validation");
const router = express_1.default.Router();
router.post("/", (0, validationRequest_1.validationRequest)(cow_validation_1.createCowZodSchema), cow_controller_1.createCowController);
router.get("/:id", cow_controller_1.getSingleCowController);
router.patch("/:id", cow_controller_1.updateCowController);
router.delete("/:id", (0, validationRequest_1.validationRequest)(cow_validation_1.updateCowZodSchema), cow_controller_1.deleteCowController);
router.get("/", cow_controller_1.getAllCowController);
exports.default = router;
