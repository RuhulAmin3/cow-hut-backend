/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from "mongoose";
import { calculatePagination } from "../../../shared/caculatePagination";
import { IUserFilterData, IUser } from "./user.interface";
import { User } from "./user.model";
import { userFilterAbleFields } from "./user.constant";

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
