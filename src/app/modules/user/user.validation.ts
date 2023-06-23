import { z } from "zod";
import { role } from "./user.constant";
export const userZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string({
        required_error: "first name is required",
      }),
      middleName: z.string().optional(),
      lastName: z.string({
        required_error: "last name is required",
      }),
    }),
    password: z.string({
      required_error: "password is required",
    }),
    phoneNumber: z.string({
      required_error: "phone number is required",
    }),
    role: z.enum(role as [string, ...string[]], {
      required_error: "role is required",
    }),
    address: z.string({
      required_error: "address is required",
    }),
    budget: z.number({
      required_error: "budget is required",
    }),
    income: z.number({
      required_error: "income is required",
    }),
  }),
});
export const updateUserZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string().optional(),
      middleName: z.string().optional(),
      lastName: z.string().optional(),
    }),
    password: z.string().optional(),
    phoneNumber: z.string().optional(),
    role: z.enum(role as [string, ...string[]]).optional(),
    address: z.string().optional(),
    budget: z.number().optional(),
    income: z.number().optional(),
  }),
});
