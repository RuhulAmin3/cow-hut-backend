import { Model } from "mongoose";

type UserName = {
  firstName: string;
  middleName?: string;
  lastName?: string;
};
export type IUser = {
  name: UserName;
  password: string;
  role: string;
  phoneNumber: string;
  address: string;
  budget: number;
  income: number;
};

export type UserModel = Model<IUser, Record<string, unknown>>;

export type IUserFilterData = {
  restQuery?: {
    address?: string;
    phoneNumber?: string;
  };
  page?: string;
  limit?: string;
  sortBy?: string;
  searchTerm?: string;
  sortOrder?: "asc" | "desc";
};
