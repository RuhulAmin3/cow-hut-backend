"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCowZodSchema = exports.createCowZodSchema = void 0;
const zod_1 = require("zod");
const cow_constant_1 = require("./cow.constant");
exports.createCowZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "first name is required",
        }),
        age: zod_1.z.number({
            required_error: "age is required",
        }),
        price: zod_1.z.number({
            required_error: "price is required",
        }),
        location: zod_1.z.enum(cow_constant_1.location, {
            required_error: "location is required",
        }),
        breed: zod_1.z.enum(cow_constant_1.breed, {
            required_error: "breed is required",
        }),
        weight: zod_1.z.number({
            required_error: "weight is required",
        }),
        label: zod_1.z.string({
            required_error: "label is required",
        }),
        category: zod_1.z.string({
            required_error: "category is required",
        }),
        seller: zod_1.z.string({
            required_error: "seller is required",
        }),
    }),
});
exports.updateCowZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        age: zod_1.z.number().optional(),
        price: zod_1.z.number().optional(),
        location: zod_1.z.enum(cow_constant_1.location).optional(),
        breed: zod_1.z.enum(cow_constant_1.breed).optional(),
        weight: zod_1.z.number().optional(),
        label: zod_1.z.string().optional(),
        category: zod_1.z.string().optional(),
        seller: zod_1.z.string().optional(),
    }),
});
