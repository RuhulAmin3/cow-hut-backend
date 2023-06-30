/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from "mongoose";
import { calculatePagination } from "../../../shared/caculatePagination";
import { cowFilterAbleFields } from "./cow.constant";
import { ICow, ICowFilters } from "./cow.interface";
import { Cow } from "./cow.model";
import { IGenericResponse } from "../../../types/genericResponse";
import { JwtPayload } from "jsonwebtoken";
import { ApiError } from "../../../error/ApiError";
import httpStatus from "http-status";

export const createCowService = async (data: ICow): Promise<ICow> => {
  const result = await Cow.create(data);
  return result;
};

export const getSingleCowService = async (id: string) => {
  const result = await Cow.findById(id);
  return result;
};

export const getAllCowService = async (
  filtersData: ICowFilters
): Promise<IGenericResponse<ICow[] | null>> => {
  const {
    searchTerm,
    page = 1,
    limit = 10,
    minPrice,
    maxPrice,
    sortBy,
    sortOrder,
    ...restQuery
  } = filtersData || {};

  const skip = calculatePagination(Number(page), Number(limit));

  const andCondition = [];

  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  if (searchTerm) {
    andCondition.push({
      $or: cowFilterAbleFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  if (minPrice) {
    andCondition.push({
      price: { $gte: minPrice },
    });
  }
  if (maxPrice) {
    andCondition.push({
      price: { $lte: maxPrice },
    });
  }

  if (Object.entries(restQuery).length > 0) {
    andCondition.push({
      $and: Object.entries(restQuery).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
  const result = await Cow.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(Number(limit));
  const count = result.length;
  return {
    meta: {
      page: Number(page),
      limit: Number(limit),
      count,
    },
    data: result,
  };
};

export const updateCowService = async (
  id: string,
  data: ICow,
  user: JwtPayload
): Promise<ICow | null> => {
  const cow = await Cow.findOne({ _id: id, seller: user.id });
  if (!cow) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "this is not your cow. you can only update your cow"
    );
  }

  const result = await Cow.findOneAndUpdate(
    { _id: id, seller: user.id },
    data,
    { new: true }
  );
  return result;
};

export const deleteCowService = async (id: string, user: JwtPayload) => {
  const cow = await Cow.findOne({ _id: id, seller: user.id });
  if (!cow) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "this is not your cow. you can only delete your cow"
    );
  }
  const result = await Cow.findOneAndUpdate({ _id: id, seller: user.id });
  return result;
};
