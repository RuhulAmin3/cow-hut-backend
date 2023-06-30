/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";
import { ApiError } from "../../../error/ApiError";
import { Cow } from "../cow/cow.model";
import { User } from "../user/user.model";
import { IOrder } from "./order.interface";
import mongoose from "mongoose";
import { Order } from "./order.model";
import { USER_ROLE } from "../../../enums/enum";
import { JwtPayload } from "jsonwebtoken";
import { ICow } from "../cow/cow.interface";

export const createOrderService = async (
  data: IOrder
): Promise<IOrder | null> => {
  const { cow: cowId, buyer: buyerId } = data;
  const cowDetails = await Cow.findById(cowId);
  const buyerDetails = await User.findById(buyerId);

  if (cowDetails && cowDetails.label === "sold out") {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "this cow is sold out choose another cow"
    );
  }

  if (cowDetails && buyerDetails && cowDetails?.price > buyerDetails?.budget) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "you need to increase your budget"
    );
  }

  const session = await mongoose.startSession();
  let orderData = null;
  try {
    session.startTransaction();
    await Cow.findOneAndUpdate(
      { _id: cowId },
      {
        label: "sold out",
      },
      { new: true, session }
    );
    const buyerRestBudget =
      Number(buyerDetails?.budget) - Number(cowDetails?.price);
    await User.findOneAndUpdate(
      { _id: buyerId },
      {
        budget: buyerRestBudget,
      },
      { new: true, session }
    );
    const seller = await User.findById(cowDetails?.seller);
    if (seller && cowDetails) {
      await User.findOneAndUpdate(
        { _id: cowDetails?.seller },
        { income: seller.income + cowDetails?.price },
        { new: true, session }
      );
    }
    const order = await Order.create([data], { session });
    orderData = order[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw err;
  }
  return orderData;
};

export const getAllOrderService = async (
  user: JwtPayload
): Promise<IOrder[] | null> => {
  let result = null;
  if (user.role === USER_ROLE.BUYER) {
    result = await Order.find({ buyer: user.id }).populate({
      path: "cow",
      populate: [{ path: "seller", select: "-password" }],
    });
  } else if (user.role === USER_ROLE.SELLER) {
    const allOrders = await Order.find({}).populate({
      path: "cow",
      populate: [{ path: "seller", select: "-password" }],
    });
    result = allOrders.filter(
      (order) => ((order.cow as ICow).seller as any).id === user.id
    );
  } else {
    result = await Order.find({}).populate({
      path: "cow",
      populate: [{ path: "seller", select: "password" }],
    });
  }
  return result;
};

export const getSingleOrderService = async (
  user: JwtPayload,
  id: string
): Promise<IOrder | null> => {
  const order = await Order.findById(id)
    .populate({
      path: "cow",
      populate: [{ path: "seller", select: "-password" }],
    })
    .populate("buyer", "-password");
  if (user.role === USER_ROLE.SELLER) {
    if (order && ((order.cow as ICow).seller as any)?.id != user.id) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "this order is not for your cow"
      );
    }
  }

  if (user.role === USER_ROLE.BUYER) {
    if (order && (order.buyer as any).id != user.id) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "you are not owner of this order"
      );
    }
  }
  return order;
};
