import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { IOrder } from "./order.interface";
import httpStatus from "http-status";
import { sendResponse } from "../../../shared/sendResponse";
import { createOrderService, getAllOrderService } from "./order.service";

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
    const result = await getAllOrderService(user);

    sendResponse<IOrder[]>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "order retrieved successfully",
      data: result,
    });
  }
);
