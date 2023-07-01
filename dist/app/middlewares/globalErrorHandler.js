"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const config_1 = __importDefault(require("../../config"));
const handleZodError_1 = require("../../error/handleZodError");
const handleValidationError_1 = require("../../error/handleValidationError");
const handleCastError_1 = require("../../error/handleCastError");
const ApiError_1 = require("../../error/ApiError");
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = "Internal server error";
    let errorMessages = [];
    if ((err === null || err === void 0 ? void 0 : err.name) === "ZodError") {
        const zodError = (0, handleZodError_1.handleZodError)(err);
        statusCode = zodError.statusCode;
        message = zodError.message;
        errorMessages = zodError.errorMessages;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === "ValidationError") {
        const validationError = (0, handleValidationError_1.handleValidationError)(err);
        statusCode = validationError.statusCode;
        message = validationError.message;
        errorMessages = validationError.errorMessages;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === "CastError") {
        const castError = (0, handleCastError_1.handleCastError)(err);
        statusCode = castError.statusCode;
        message = castError.message;
        errorMessages = castError.errorMessages;
    }
    else if (err instanceof Error) {
        message = err === null || err === void 0 ? void 0 : err.message;
        errorMessages = (err === null || err === void 0 ? void 0 : err.message) ? [{ path: "", message: err === null || err === void 0 ? void 0 : err.message }] : [];
    }
    else if (err instanceof ApiError_1.ApiError) {
        message = err === null || err === void 0 ? void 0 : err.message;
        statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
        errorMessages = (err === null || err === void 0 ? void 0 : err.message) ? [{ path: "", message: err === null || err === void 0 ? void 0 : err.message }] : [];
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: config_1.default.env !== "production" ? err === null || err === void 0 ? void 0 : err.stack : undefined,
    });
};
exports.globalErrorHandler = globalErrorHandler;
