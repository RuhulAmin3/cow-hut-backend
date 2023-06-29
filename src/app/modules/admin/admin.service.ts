/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from "bcrypt";
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";
import { ApiError } from "../../../error/ApiError";
import {
  IAdmin,
  IAdminLoginData,
  IAdminLoginResponse,
} from "./admin.interface";
import { Admin } from "./admin.model";
import { createToken } from "../../../utils/jwtHelpers";
import config from "../../../config";
import { JwtPayload, Secret } from "jsonwebtoken";

export const createAdminService = async (
  data: IAdmin
): Promise<Partial<IAdmin | null>> => {
  const result = await Admin.create(data);
  const { password, ...restResult } = result.toObject();
  return restResult;
};

export const adminLoginService = async (
  loginData: IAdminLoginData
): Promise<IAdminLoginResponse> => {
  const { phoneNumber } = loginData;
  const admin = await Admin.findOne({ phoneNumber });
  if (!admin) {
    throw new ApiError(httpStatus.NOT_FOUND, "admin not found");
  }

  const accessToken = createToken(
    { id: admin._id, role: admin.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  const refreshToken = createToken(
    { id: admin._id, role: admin.role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );
  return {
    accessToken,
    refreshToken,
  };
};

export const getAdminProfileService = async (
  user: JwtPayload
): Promise<Partial<IAdmin | null>> => {
  const { id, role } = user;
  const result = await Admin.findOne({ _id: id, role });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "admin profile data not found");
  }
  const { password, ...restResult } = result.toObject();
  return restResult;
};

export const updateAdminProfileService = async (
  user: JwtPayload,
  id: string,
  data: IAdmin
): Promise<Partial<IAdmin | null>> => {
  const { name, password, ...restData } = data;
  const admin = await Admin.findOne({ _id: user.id, role: user.role });
  if (!admin) {
    throw new ApiError(httpStatus.NOT_FOUND, "admin does not exist");
  }

  if (admin && user.id != admin.id) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "you cannot update this account."
    );
  }

  let hashPassword = password;
  if (password) {
    hashPassword = await bcrypt.hash(
      password,
      Number(config.bcrypt_solt_label)
    );
  }

  const updateData = { ...restData, password: hashPassword };
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach((key) => {
      const nameKey = `name.${key}`;
      (updateData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const updatedAdmin = await Admin.findOneAndUpdate(
    {
      _id: user.id,
      role: user.role,
    },
    updateData,
    { new: true }
  );
  if (!updatedAdmin) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "failed to update admin profile informaiton"
    );
  }

  const { password: updatePassword, ...restUpdateAdminData } =
    updatedAdmin.toObject();
  return restUpdateAdminData;
};
