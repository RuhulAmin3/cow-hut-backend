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

export type IUserMethods = {
  // here we declared our instance methods
  isUserExist(phoneNumber: string): Promise<IUser | null>;
} & IUser;

export type UserModel = {
  isPasswordCorrect( // here we can declared our statics methods and merge methods
    savedPassword: string,
    givenPassword: string
  ): Promise<boolean>;
} & Model<IUser, object, IUserMethods>;

// export type UserModel = Model<IUser, Record<string, unknown>>;

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
