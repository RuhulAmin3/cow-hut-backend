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
exports.refreshTokenService = exports.loginUserService = exports.createUserService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = require("../../../error/ApiError");
const user_model_1 = require("../user/user.model");
const jwtHelpers_1 = require("../../../utils/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
const createUserService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.create(data);
    if (!result) {
        throw new ApiError_1.ApiError(http_status_1.default.BAD_REQUEST, "failed to create user");
    }
    const restResult = yield user_model_1.User.findById(result.id).select("-password");
    // const { password, ...restResult } = result.toObject();
    return restResult;
});
exports.createUserService = createUserService;
const loginUserService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new user_model_1.User();
    const isUser = yield user.isUserExist(data.phoneNumber);
    if (!isUser) {
        throw new ApiError_1.ApiError(http_status_1.default.NOT_FOUND, "user not found");
    }
    const isPasswordCorrect = yield user_model_1.User.isPasswordCorrect(isUser.password, data.password);
    if (!isPasswordCorrect) {
        throw new ApiError_1.ApiError(http_status_1.default.UNAUTHORIZED, "incorrect password");
    }
    const accessToken = (0, jwtHelpers_1.createToken)({ id: isUser === null || isUser === void 0 ? void 0 : isUser.id, role: isUser.role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = (0, jwtHelpers_1.createToken)({ id: isUser === null || isUser === void 0 ? void 0 : isUser.id, role: isUser.role }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
exports.loginUserService = loginUserService;
const refreshTokenService = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let decodedData = null;
    try {
        decodedData = (0, jwtHelpers_1.varifyToken)(token, config_1.default.jwt.refresh_secret);
    }
    catch (err) {
        throw new ApiError_1.ApiError(http_status_1.default.FORBIDDEN, "refresh token is not valid");
    }
    const { id } = decodedData;
    const user = yield user_model_1.User.findById(id);
    if (!user) {
        throw new ApiError_1.ApiError(http_status_1.default.NOT_FOUND, "user does not exist");
    }
    const accessToken = (0, jwtHelpers_1.createToken)({ id: user._id, role: user.role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return accessToken;
});
exports.refreshTokenService = refreshTokenService;
