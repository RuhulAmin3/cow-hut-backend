import { z } from "zod";
import { breed, location } from "./cow.constant";

export const createCowZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "first name is required",
    }),
    age: z.number({
      required_error: "age is required",
    }),
    price: z.number({
      required_error: "price is required",
    }),
    location: z.enum(location as [string, ...string[]], {
      required_error: "location is required",
    }),
    breed: z.enum(breed as [string, ...string[]], {
      required_error: "breed is required",
    }),
    weight: z.number({
      required_error: "weight is required",
    }),
    label: z.string({
      required_error: "label is required",
    }),
    category: z.string({
      required_error: "category is required",
    }),
    seller: z.string({
      required_error: "seller is required",
    }),
  }),
});

export const updateCowZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    age: z.number().optional(),
    price: z.number().optional(),
    location: z.enum(location as [string, ...string[]]).optional(),
    breed: z.enum(breed as [string, ...string[]]).optional(),
    weight: z.number().optional(),
    label: z.string().optional(),
    category: z.string().optional(),
    seller: z.string().optional(),
  }),
});
