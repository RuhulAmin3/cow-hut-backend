"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationError = void 0;
const handleValidationError = (err) => {
    const errorMessages = Object.keys(err.errors).map((error) => {
        var _a, _b;
        return ({
            path: (_a = err.errors[error]) === null || _a === void 0 ? void 0 : _a.path,
            message: (_b = err.errors[error]) === null || _b === void 0 ? void 0 : _b.message,
        });
    });
    return {
        statusCode: 400,
        message: "validation Error",
        errorMessages,
    };
};
exports.handleValidationError = handleValidationError;
