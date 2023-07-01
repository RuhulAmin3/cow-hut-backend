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
exports.getSingleOrderService = exports.getAllOrderService = exports.createOrderService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = require("../../../error/ApiError");
const cow_model_1 = require("../cow/cow.model");
const user_model_1 = require("../user/user.model");
const mongoose_1 = __importDefault(require("mongoose"));
const order_model_1 = require("./order.model");
const enum_1 = require("../../../enums/enum");
const createOrderService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { cow: cowId, buyer: buyerId } = data;
    const cowDetails = yield cow_model_1.Cow.findById(cowId);
    const buyerDetails = yield user_model_1.User.findById(buyerId);
    if (cowDetails && cowDetails.label === "sold out") {
        throw new ApiError_1.ApiError(http_status_1.default.BAD_REQUEST, "this cow is sold out choose another cow");
    }
    if (cowDetails && buyerDetails && (cowDetails === null || cowDetails === void 0 ? void 0 : cowDetails.price) > (buyerDetails === null || buyerDetails === void 0 ? void 0 : buyerDetails.budget)) {
        throw new ApiError_1.ApiError(http_status_1.default.BAD_REQUEST, "you need to increase your budget");
    }
    const session = yield mongoose_1.default.startSession();
    let orderData = null;
    try {
        session.startTransaction();
        yield cow_model_1.Cow.findOneAndUpdate({ _id: cowId }, {
            label: "sold out",
        }, { new: true, session });
        const buyerRestBudget = Number(buyerDetails === null || buyerDetails === void 0 ? void 0 : buyerDetails.budget) - Number(cowDetails === null || cowDetails === void 0 ? void 0 : cowDetails.price);
        yield user_model_1.User.findOneAndUpdate({ _id: buyerId }, {
            budget: buyerRestBudget,
        }, { new: true, session });
        const seller = yield user_model_1.User.findById(cowDetails === null || cowDetails === void 0 ? void 0 : cowDetails.seller);
        if (seller && cowDetails) {
            yield user_model_1.User.findOneAndUpdate({ _id: cowDetails === null || cowDetails === void 0 ? void 0 : cowDetails.seller }, { income: seller.income + (cowDetails === null || cowDetails === void 0 ? void 0 : cowDetails.price) }, { new: true, session });
        }
        const order = yield order_model_1.Order.create([data], { session });
        orderData = order[0];
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw err;
    }
    return orderData;
});
exports.createOrderService = createOrderService;
const getAllOrderService = (user) => __awaiter(void 0, void 0, void 0, function* () {
    let result = null;
    if (user.role === enum_1.USER_ROLE.BUYER) {
        result = yield order_model_1.Order.find({ buyer: user.id }).populate({
            path: "cow",
            populate: [{ path: "seller", select: "-password" }],
        });
    }
    else if (user.role === enum_1.USER_ROLE.SELLER) {
        const allOrders = yield order_model_1.Order.find({}).populate({
            path: "cow",
            populate: [{ path: "seller", select: "-password" }],
        });
        result = allOrders.filter((order) => order.cow.seller.id === user.id);
    }
    else {
        result = yield order_model_1.Order.find({}).populate({
            path: "cow",
            populate: [{ path: "seller", select: "password" }],
        });
    }
    return result;
});
exports.getAllOrderService = getAllOrderService;
const getSingleOrderService = (user, id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const order = yield order_model_1.Order.findById(id)
        .populate({
        path: "cow",
        populate: [{ path: "seller", select: "-password" }],
    })
        .populate("buyer", "-password");
    if (user.role === enum_1.USER_ROLE.SELLER) {
        if (order && ((_a = order.cow.seller) === null || _a === void 0 ? void 0 : _a.id) != user.id) {
            throw new ApiError_1.ApiError(http_status_1.default.UNAUTHORIZED, "this order is not for your cow");
        }
    }
    if (user.role === enum_1.USER_ROLE.BUYER) {
        if (order && order.buyer.id != user.id) {
            throw new ApiError_1.ApiError(http_status_1.default.UNAUTHORIZED, "you are not owner of this order");
        }
    }
    return order;
});
exports.getSingleOrderService = getSingleOrderService;
