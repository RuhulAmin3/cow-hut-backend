import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import { ICow } from "./cow.interface";
import httpStatus from "http-status";
import {
  createCowService,
  deleteCowService,
  getSingleCowService,
  updateCowService,
  getAllCowService,
} from "./cow.service";
import { JwtPayload } from "jsonwebtoken";

export const createCowController = catchAsync(
  async (req: Request, res: Response) => {
    const cowData = req.body;
    const result = await createCowService(cowData);
    sendResponse<ICow>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "cow created successfully",
      data: result,
    });
  }
);

export const getSingleCowController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await getSingleCowService(id);
    sendResponse<ICow>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "cow retrieved successfully",
      data: result,
    });
  }
);

export const updateCowController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedData = req.body;
    const result = await updateCowService(
      id,
      updatedData,
      req.user as JwtPayload
    );
    sendResponse<ICow>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "cow updated successfully",
      data: result,
    });
  }
);

export const deleteCowController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await deleteCowService(id, req.user as JwtPayload);
    sendResponse<ICow>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "cow deleted successfully",
      data: result,
    });
  }
);

export const getAllCowController = catchAsync(
  async (req: Request, res: Response) => {
    const filtersData = req.query;
    const result = await getAllCowService(filtersData);

    sendResponse<ICow[]>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "cows retrieved successfully",
      meta: result.meta,
      data: result.data,
    });
  }
);
