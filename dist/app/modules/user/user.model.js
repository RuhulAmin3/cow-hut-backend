"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
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
exports.User = (0, mongoose_1.model)("user", userSchema);
