"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const ApiError_1 = require("../../error/ApiError");
const http_status_1 = __importDefault(require("http-status"));
const jwtHelpers_1 = require("../../utils/jwtHelpers");
const config_1 = __importDefault(require("../../config"));
const auth = (...roles) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        if (!token) {
            throw new ApiError_1.ApiError(http_status_1.default.UNAUTHORIZED, "you are unauthorized user");
        }
        let verifiedToken = null;
        verifiedToken = (0, jwtHelpers_1.varifyToken)(token, config_1.default.jwt.secret);
        req.user = verifiedToken;
        if (roles.length > 0 && !roles.includes(verifiedToken.role)) {
            throw new ApiError_1.ApiError(http_status_1.default.FORBIDDEN, "you are forbidden user");
        }
        next();
    }
    catch (err) {
        next(err);
    }
});
exports.auth = auth;
