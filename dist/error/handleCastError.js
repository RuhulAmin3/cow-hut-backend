"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCastError = void 0;
const handleCastError = (err) => {
    const errorMessages = [
        { path: err === null || err === void 0 ? void 0 : err.path, message: err === null || err === void 0 ? void 0 : err.message },
    ];
    return {
        statusCode: 400,
        message: "Invalid Id",
        errorMessages,
    };
};
exports.handleCastError = handleCastError;
