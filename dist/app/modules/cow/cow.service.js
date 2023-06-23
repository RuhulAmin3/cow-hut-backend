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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCowService = exports.updateCowService = exports.getAllCowService = exports.getSingleCowService = exports.createCowService = void 0;
const caculatePagination_1 = require("../../../shared/caculatePagination");
const cow_constant_1 = require("./cow.constant");
const cow_model_1 = require("./cow.model");
const createCowService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.Cow.create(data);
    return result;
});
exports.createCowService = createCowService;
const getSingleCowService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.Cow.findById(id);
    return result;
});
exports.getSingleCowService = getSingleCowService;
const getAllCowService = (filtersData) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = filtersData || {}, { searchTerm, page = 1, limit = 10, minPrice, maxPrice, sortBy, sortOrder } = _a, restQuery = __rest(_a, ["searchTerm", "page", "limit", "minPrice", "maxPrice", "sortBy", "sortOrder"]);
    const skip = (0, caculatePagination_1.calculatePagination)(Number(page), Number(limit));
    const andCondition = [];
    const sortCondition = {};
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }
    if (searchTerm) {
        andCondition.push({
            $or: cow_constant_1.cowFilterAbleFields.map((field) => ({
                [field]: {
                    $regex: searchTerm,
                    $options: "i",
                },
            })),
        });
    }
    if (minPrice) {
        andCondition.push({
            price: { $gte: minPrice },
        });
    }
    if (maxPrice) {
        andCondition.push({
            price: { $lte: maxPrice },
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
    const result = yield cow_model_1.Cow.find(whereCondition)
        .sort(sortCondition)
        .skip(skip)
        .limit(Number(limit));
    const count = result.length;
    return {
        meta: {
            page: Number(page),
            limit: Number(limit),
            count,
        },
        data: result,
    };
});
exports.getAllCowService = getAllCowService;
const updateCowService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.Cow.findByIdAndUpdate(id, data, { new: true });
    return result;
});
exports.updateCowService = updateCowService;
const deleteCowService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.Cow.findByIdAndDelete(id);
    return result;
});
exports.deleteCowService = deleteCowService;
