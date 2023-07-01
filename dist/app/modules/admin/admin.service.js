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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAdminProfileService = exports.getAdminProfileService = exports.adminLoginService = exports.createAdminService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = require("../../../error/ApiError");
const admin_model_1 = require("./admin.model");
const jwtHelpers_1 = require("../../../utils/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
const protectPassword_1 = require("../../../utils/protectPassword");
const createAdminService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_model_1.Admin.create(data);
    if (!result) {
        throw new ApiError_1.ApiError(http_status_1.default.BAD_REQUEST, "failed to create admin");
    }
    const restResult = yield admin_model_1.Admin.findById(result.id).select("-password");
    // const { password, ...restResult } = result.toObject();
    return restResult;
});
exports.createAdminService = createAdminService;
const adminLoginService = (loginData) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber } = loginData;
    const admin = yield admin_model_1.Admin.findOne({ phoneNumber });
    if (!admin) {
        throw new ApiError_1.ApiError(http_status_1.default.NOT_FOUND, "admin not found");
    }
    const accessToken = (0, jwtHelpers_1.createToken)({ id: admin._id, role: admin.role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = (0, jwtHelpers_1.createToken)({ id: admin._id, role: admin.role }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
exports.adminLoginService = adminLoginService;
const getAdminProfileService = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, role } = user;
    const result = yield admin_model_1.Admin.findOne({ _id: id, role }, { password: 0 });
    if (!result) {
        throw new ApiError_1.ApiError(http_status_1.default.NOT_FOUND, "admin profile data not found");
    }
    return result;
});
exports.getAdminProfileService = getAdminProfileService;
const updateAdminProfileService = (user, id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, password } = data, restData = __rest(data, ["name", "password"]);
    const admin = yield admin_model_1.Admin.findOne({ _id: user.id, role: user.role });
    if (!admin) {
        throw new ApiError_1.ApiError(http_status_1.default.NOT_FOUND, "admin does not exist");
    }
    if (admin && user.id != admin.id) {
        throw new ApiError_1.ApiError(http_status_1.default.UNAUTHORIZED, "you cannot update this account.");
    }
    let hashPassword = password;
    if (password) {
        hashPassword = yield (0, protectPassword_1.hashedPassword)(password, Number(config_1.default.bcrypt_solt_label));
    }
    const updateData = Object.assign(Object.assign({}, restData), { password: hashPassword });
    if (name && Object.keys(name).length > 0) {
        Object.keys(name).forEach((key) => {
            const nameKey = `name.${key}`;
            updateData[nameKey] = name[key];
        });
    }
    const updatedAdmin = yield admin_model_1.Admin.findOneAndUpdate({
        _id: user.id,
        role: user.role,
    }, updateData, { new: true }).select("-password");
    if (!updatedAdmin) {
        throw new ApiError_1.ApiError(http_status_1.default.BAD_REQUEST, "failed to update admin profile informaiton");
    }
    // const { password: updatePassword, ...restUpdateAdminData } =
    //   updatedAdmin.toObject();
    return updatedAdmin;
});
exports.updateAdminProfileService = updateAdminProfileService;
