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
): Promise<IAdmin | null> => {
  const result = await Admin.create(data);
  return result;
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

export const getAdminProfileService = async (user: JwtPayload) => {
  const { id, role } = user;
  const result = await Admin.findOne({ _id: id, role });
  return result;
};
