import { Model, Types } from "mongoose";
import { IUser } from "../user/user.interface";

export type ICow = {
  name: string;
  age: number;
  price: number;
  location: string;
  breed: string;
  weight: number;
  label: string;
  category: string;
  seller: Types.ObjectId | IUser;
};

export type CowModel = Model<ICow, Record<string, unknown>>;

export type ICowFilters = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  minPrice?: number;
  maxPrice?: number;
  location?: string;
  searchTerm?: string;
};
