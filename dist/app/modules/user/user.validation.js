"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileZodSchema = exports.updateUserZodSchema = void 0;
const zod_1 = require("zod");
const user_constant_1 = require("./user.constant");
exports.updateUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .object({
            firstName: zod_1.z.string().optional(),
            middleName: zod_1.z.string().optional(),
            lastName: zod_1.z.string().optional(),
        })
            .optional(),
        password: zod_1.z.string().optional(),
        phoneNumber: zod_1.z.string().optional(),
        role: zod_1.z.enum(user_constant_1.role).optional(),
        address: zod_1.z.string().optional(),
        budget: zod_1.z.number().optional(),
        income: zod_1.z.number().optional(),
    }),
});
exports.updateProfileZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .object({
            firstName: zod_1.z.string().optional(),
            middleName: zod_1.z.string().optional(),
            lastName: zod_1.z.string().optional(),
        })
            .optional(),
        password: zod_1.z.string().optional(),
        phoneNumber: zod_1.z.string().optional(),
        role: zod_1.z.enum(user_constant_1.role).optional(),
        address: zod_1.z.string().optional(),
        budget: zod_1.z.number().optional(),
        income: zod_1.z.number().optional(),
    }),
});
