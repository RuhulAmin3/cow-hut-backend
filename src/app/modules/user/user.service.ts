/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from "mongoose";
import { calculatePagination } from "../../../shared/caculatePagination";
import {
  IUserFilterData,
  IUser,
  ILogin,
  ILoginResponse,
} from "./user.interface";
import { User } from "./user.model";
import { userFilterAbleFields } from "./user.constant";
import httpStatus from "http-status";
import { ApiError } from "../../../error/ApiError";
import { createToken } from "../../../utils/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";

export const createUserService = async (data: IUser): Promise<IUser> => {
  const result = await User.create(data);
  return result;
};

export const getAllUserService = async (
  filteredData: IUserFilterData
): Promise<IUser[] | null> => {
  const { searchTerm, page, limit, sortBy, sortOrder, ...restQuery } =
    filteredData || {};

  const skip = calculatePagination(Number(page), Number(limit));

  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: userFilterAbleFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
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
  const result = await User.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(Number(limit));

  return result;
};

export const getSingleUserService = async (
  id: string
): Promise<IUser | null> => {
  const result = await User.findById(id);
  return result;
};

export const updateUserService = async (
  id: string,
  data: IUser
): Promise<IUser | null> => {
  const { name, ...restData } = data;
  const userData = { ...restData };

  if (Object.keys(name).length > 0) {
    Object.keys(name).map((key) => {
      const userNameKey = `name.${key}` as keyof typeof name;
      (userData as any)[userNameKey] = name[key as keyof typeof name];
    });
  }

  const result = await User.findByIdAndUpdate(id, userData, { new: true });

  return result;
};

export const deleteUserService = async (id: string): Promise<IUser | null> => {
  const result = await User.findOneAndDelete({ _id: id });
  return result;
};

export const loginUserService = async (
  data: ILogin
): Promise<ILoginResponse> => {
  const user = new User();
  const isUser = await user.isUserExist(data.phoneNumber);
  if (!isUser) {
    throw new ApiError(httpStatus.NOT_FOUND, "user not found");
  }

  const isPasswordCorrect = await User.isPasswordCorrect(
    isUser.password as string,
    data.password as string
  );

  if (!isPasswordCorrect) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "incorrect password");
  }

  const accessToken = createToken(
    { id: isUser?._id, role: isUser.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = createToken(
    { id: isUser?._id, role: isUser.role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};
