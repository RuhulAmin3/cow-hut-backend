import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { IOrder } from "./order.interface";
import httpStatus from "http-status";
import { sendResponse } from "../../../shared/sendResponse";
import {
  createOrderService,
  getAllOrderService,
  getSingleOrderService,
} from "./order.service";
import { JwtPayload } from "jsonwebtoken";

export const createOrderController = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;
    const result = await createOrderService(data);

    sendResponse<IOrder>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "order created successfully",
      data: result,
    });
  }
);

export const getAllOrderController = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;
    const result = await getAllOrderService(user as JwtPayload);

    sendResponse<IOrder[]>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "order retrieved successfully",
      data: result,
    });
  }
);
export const getSingleOrderController = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;
    const { id } = req.params;
    const result = await getSingleOrderService(user as JwtPayload, id);

    sendResponse<IOrder>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "order retrieved successfully",
      data: result,
    });
  }
);
