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
exports.updateProfileService = exports.profileService = exports.deleteUserService = exports.updateUserService = exports.getSingleUserService = exports.getAllUserService = exports.createUserService = void 0;
const caculatePagination_1 = require("../../../shared/caculatePagination");
const user_model_1 = require("./user.model");
const user_constant_1 = require("./user.constant");
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = require("../../../error/ApiError");
const http_status_1 = __importDefault(require("http-status"));
const protectPassword_1 = require("../../../utils/protectPassword");
const createUserService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.create(data);
    return result;
});
exports.createUserService = createUserService;
const getAllUserService = (filteredData) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = filteredData || {}, { searchTerm, page, limit, sortBy, sortOrder } = _a, restQuery = __rest(_a, ["searchTerm", "page", "limit", "sortBy", "sortOrder"]);
    const skip = (0, caculatePagination_1.calculatePagination)(Number(page), Number(limit));
    const sortCondition = {};
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }
    const andCondition = [];
    if (searchTerm) {
        andCondition.push({
            $or: user_constant_1.userFilterAbleFields.map((field) => ({
                [field]: {
                    $regex: searchTerm,
                    $options: "i",
                },
            })),
        });
    }
    if (Object.entries(restQuery).length > 0) {
        andCondition.push({
            $and: Object.entries(restQuery).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
    const result = yield user_model_1.User.find(whereCondition, { password: 0 })
        .sort(sortCondition)
        .skip(skip)
        .limit(Number(limit));
    return result;
});
exports.getAllUserService = getAllUserService;
const getSingleUserService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findById(id, { password: 0 });
    return result;
});
exports.getSingleUserService = getSingleUserService;
const updateUserService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, password } = data, restData = __rest(data, ["name", "password"]);
    let hashPassword = password;
    if (password) {
        hashPassword = yield (0, protectPassword_1.hashedPassword)(password, Number(config_1.default.bcrypt_solt_label));
    }
    const userData = Object.assign(Object.assign({}, restData), { password: hashPassword });
    if (name && Object.keys(name).length > 0) {
        Object.keys(name).forEach((key) => {
            const userNameKey = `name.${key}`;
            userData[userNameKey] = name[key];
        });
    }
    const result = yield user_model_1.User.findByIdAndUpdate(id, userData, {
        new: true,
    }).select("-password");
    return result;
});
exports.updateUserService = updateUserService;
const deleteUserService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOneAndDelete({ _id: id }).select("-password");
    return result;
});
exports.deleteUserService = deleteUserService;
// profile services
const profileService = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, role } = user;
    const result = yield user_model_1.User.findOne({ _id: id, role }, { password: 0 });
    return result;
});
exports.profileService = profileService;
const updateProfileService = (user, data) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, role } = user;
    const renter = yield user_model_1.User.findOne({ _id: id, role });
    if (!renter) {
        throw new ApiError_1.ApiError(http_status_1.default.NOT_FOUND, "user does not exist");
    }
    if (renter && id != renter.id) {
        throw new ApiError_1.ApiError(http_status_1.default.UNAUTHORIZED, "you can update only your account. This is not your account");
    }
    const { password, name } = data, restData = __rest(data, ["password", "name"]);
    let hashPassword = password;
    if (password) {
        hashPassword = yield (0, protectPassword_1.hashedPassword)(password, Number(config_1.default.bcrypt_solt_label));
    }
    const updatedData = Object.assign(Object.assign({}, restData), { password: hashPassword });
    if (name && Object.keys(name).length > 0) {
        Object.keys(name).forEach((key) => {
            const namedKey = `name.${key}`;
            updatedData[namedKey] = name[key];
        });
    }
    const result = yield user_model_1.User.findByIdAndUpdate({ _id: id, role }, updatedData, {
        new: true,
    }).select("-password");
    return result;
});
exports.updateProfileService = updateProfileService;
