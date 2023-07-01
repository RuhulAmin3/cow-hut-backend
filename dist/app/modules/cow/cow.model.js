"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cow = void 0;
const mongoose_1 = require("mongoose");
const cow_constant_1 = require("./cow.constant");
const cowSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
        enum: cow_constant_1.location,
    },
    breed: {
        type: String,
        required: true,
        enum: cow_constant_1.breed,
    },
    weight: {
        type: Number,
        required: true,
    },
    label: {
        type: String,
        required: true,
        enum: ["for sale", "sold out"],
    },
    category: {
        type: String,
        required: true,
        enum: ["Dairy", "Beef", "DualPurpose"],
    },
    seller: {
        type: mongoose_1.Types.ObjectId,
        ref: "user",
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Cow = (0, mongoose_1.model)("cow", cowSchema);
