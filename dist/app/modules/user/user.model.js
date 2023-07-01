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
exports.User = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = require("../../../error/ApiError");
const http_status_1 = __importDefault(require("http-status"));
const userSchema = new mongoose_1.Schema({
    name: {
        type: {
            firstName: {
                type: String,
                required: true,
            },
            middleName: {
                type: String,
            },
            lastName: {
                type: String,
                required: true,
            },
        },
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["seller", "buyer"],
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    income: {
        type: Number,
        required: true,
        default: 0,
    },
    budget: {
        type: Number,
        required: true,
        default: 0,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
userSchema.methods.isUserExist = function (phoneNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield exports.User.findOne({ phoneNumber });
    });
};
userSchema.statics.isPasswordCorrect = function (savedPassword, givenPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(givenPassword, savedPassword);
    });
};
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield exports.User.findOne({ phoneNumber: this.phoneNumber });
        if (user) {
            throw new ApiError_1.ApiError(http_status_1.default.CONFLICT, "user already exist");
        }
        this.password = yield bcrypt_1.default.hash(this.password, Number(config_1.default.bcrypt_solt_label));
        next();
    });
});
exports.User = (0, mongoose_1.model)("user", userSchema);
