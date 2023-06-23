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
exports.getAllOrderService = exports.createOrderService = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = require("../../../error/ApiError");
const cow_model_1 = require("../cow/cow.model");
const user_model_1 = require("../user/user.model");
const mongoose_1 = __importDefault(require("mongoose"));
const order_model_1 = require("./order.model");
const createOrderService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { cow: cowId, buyer: buyerId } = data;
    const cowDetails = yield cow_model_1.Cow.findById(cowId);
    const buyerDetails = yield user_model_1.User.findById(buyerId);
    if (cowDetails && buyerDetails && (cowDetails === null || cowDetails === void 0 ? void 0 : cowDetails.price) > (buyerDetails === null || buyerDetails === void 0 ? void 0 : buyerDetails.budget)) {
        throw new ApiError_1.ApiError(http_status_1.default.BAD_REQUEST, "you need to increase your budget");
    }
    const session = yield mongoose_1.default.startSession();
    let orderData = null;
    try {
        session.startTransaction();
        yield cow_model_1.Cow.findByIdAndUpdate(cowId, {
            label: "sold out",
        }, { new: true });
        const buyerRestBudget = Number(buyerDetails === null || buyerDetails === void 0 ? void 0 : buyerDetails.budget) - Number(cowDetails === null || cowDetails === void 0 ? void 0 : cowDetails.price);
        yield user_model_1.User.findByIdAndUpdate(buyerId, {
            budget: buyerRestBudget,
        }, { new: true });
        yield user_model_1.User.findByIdAndUpdate(cowDetails === null || cowDetails === void 0 ? void 0 : cowDetails.seller, { income: cowDetails === null || cowDetails === void 0 ? void 0 : cowDetails.price }, { new: true });
        orderData = yield order_model_1.Order.create(data);
        session.commitTransaction();
        session.endSession();
    }
    catch (err) {
        session.abortTransaction();
        session.endSession();
        throw err;
    }
    return orderData;
});
exports.createOrderService = createOrderService;
const getAllOrderService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.find();
    return result;
});
exports.getAllOrderService = getAllOrderService;
