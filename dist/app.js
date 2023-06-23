"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const globalErrorHandler_1 = require("./app/middlewares/globalErrorHandler");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = require("./error/ApiError");
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use("/api/v1/", routes_1.default);
exports.app.get("/", (req, res) => {
    res.send("In the name of Allah");
});
exports.app.all("*", (req, res, next) => {
    const err = new ApiError_1.ApiError(http_status_1.default.NOT_FOUND, `Can't find ${req.originalUrl} on this server!`);
    next(err);
});
exports.app.use(globalErrorHandler_1.globalErrorHandler);
