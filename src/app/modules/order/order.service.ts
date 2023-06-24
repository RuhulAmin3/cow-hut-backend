/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";
import { ApiError } from "../../../error/ApiError";
import { Cow } from "../cow/cow.model";
import { User } from "../user/user.model";
import { IOrder } from "./order.interface";
import mongoose from "mongoose";
import { Order } from "./order.model";

export const createOrderService = async (
  data: IOrder
): Promise<IOrder | null> => {
  const { cow: cowId, buyer: buyerId } = data;
  const cowDetails = await Cow.findById(cowId);
  const buyerDetails = await User.findById(buyerId);
  if (cowDetails && buyerDetails && cowDetails?.price > buyerDetails?.budget) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "you need to increase your budget"
    );
  }

  if (cowDetails && cowDetails.label === "sold out") {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "this cow is sold out choose another cow"
    );
  }

  const session = await mongoose.startSession();
  let orderData = null;
  try {
    session.startTransaction();
    await Cow.findByIdAndUpdate(cowId, {
      label: "sold out",
    });
    const buyerRestBudget =
      Number(buyerDetails?.budget) - Number(cowDetails?.price);
    await User.findByIdAndUpdate(
      buyerId,
      {
        budget: buyerRestBudget,
      },
      { new: true }
    );
    await User.findByIdAndUpdate(
      cowDetails?.seller,
      { income: cowDetails?.price },
      { new: true }
    );
    orderData = await Order.create(data);
    session.commitTransaction();
    session.endSession();
  } catch (err) {
    session.abortTransaction();
    session.endSession();
    throw err;
  }

  return orderData;
};

export const getAllOrderService = async (): Promise<IOrder[]> => {
  const result = await Order.find();
  return result;
};
