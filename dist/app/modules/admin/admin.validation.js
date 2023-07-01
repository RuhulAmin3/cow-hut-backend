"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAdminProfileZodSchema = exports.adminLoginZodSchema = exports.createAdminZodSchema = void 0;
const zod_1 = require("zod");
exports.createAdminZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        phoneNumber: zod_1.z.string({
            required_error: "phone number is required",
        }),
        password: zod_1.z.string({
            required_error: "password is required",
        }),
        role: zod_1.z.string({
            required_error: "role is required",
        }),
        name: zod_1.z.object({
            firstName: zod_1.z.string({
                required_error: "first name is required",
            }),
            middleName: zod_1.z.string().optional(),
            lastName: zod_1.z.string({
                required_error: "last name is required",
            }),
        }),
        address: zod_1.z.string({
            required_error: "address is required",
        }),
    }),
});
exports.adminLoginZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        phoneNumber: zod_1.z.string({
            required_error: "phone number is required",
        }),
        password: zod_1.z.string({
            required_error: "password is required",
        }),
    }),
});
exports.updateAdminProfileZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        phoneNumber: zod_1.z.string().optional(),
        password: zod_1.z.string().optional(),
        role: zod_1.z.string().optional(),
        name: zod_1.z
            .object({
            firstName: zod_1.z.string().optional(),
            middleName: zod_1.z.string().optional(),
            lastName: zod_1.z.string().optional(),
        })
            .optional(),
        address: zod_1.z.string().optional(),
    }),
});
