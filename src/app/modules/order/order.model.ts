import { Schema, Types, model } from "mongoose";
import { IOrder, OrderModel } from "./order.interface";

const orderSchema = new Schema<IOrder, OrderModel>(
  {
    cow: {
      type: Types.ObjectId,
      ref: "cow",
      require: true,
    },
    buyer: {
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

export const Order = model<IOrder, OrderModel>("order", orderSchema);
