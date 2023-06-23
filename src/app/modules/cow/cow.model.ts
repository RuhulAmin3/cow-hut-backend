import { Schema, Types, model } from "mongoose";
import { CowModel, ICow } from "./cow.interface";
import { breed, location } from "./cow.constant";

const cowSchema = new Schema<ICow, CowModel>(
  {
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
      enum: location,
    },
    breed: {
      type: String,
      required: true,
      enum: breed,
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
      type: Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Cow = model<ICow, CowModel>("cow", cowSchema);
