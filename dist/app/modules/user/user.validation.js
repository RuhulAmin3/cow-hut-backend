"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserZodSchema = exports.userZodSchema = void 0;
const zod_1 = require("zod");
const user_constant_1 = require("./user.constant");
exports.userZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.object({
            firstName: zod_1.z.string({
                required_error: "first name is required",
            }),
            middleName: zod_1.z.string().optional(),
            lastName: zod_1.z.string({
                required_error: "last name is required",
            }),
        }),
        password: zod_1.z.string({
            required_error: "password is required",
        }),
        phoneNumber: zod_1.z.string({
            required_error: "phone number is required",
        }),
        role: zod_1.z.enum(user_constant_1.role, {
            required_error: "role is required",
        }),
        address: zod_1.z.string({
            required_error: "address is required",
        }),
        budget: zod_1.z.number({
            required_error: "budget is required",
        }),
        income: zod_1.z.number({
            required_error: "income is required",
        }),
    }),
});
exports.updateUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.object({
            firstName: zod_1.z.string().optional(),
            middleName: zod_1.z.string().optional(),
            lastName: zod_1.z.string().optional(),
        }),
        password: zod_1.z.string().optional(),
        phoneNumber: zod_1.z.string().optional(),
        role: zod_1.z.enum(user_constant_1.role).optional(),
        address: zod_1.z.string().optional(),
        budget: zod_1.z.number().optional(),
        income: zod_1.z.number().optional(),
    }),
});
