/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";
import { ApiError } from "../../../error/ApiError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { ILogin, ILoginResponse } from "./auth.interface";
import { createToken, varifyToken } from "../../../utils/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";

export const createUserService = async (
  data: IUser
): Promise<Partial<IUser>> => {
  const result = await User.create(data);
  const { password, ...restResult } = result.toObject();
  return restResult;
};

export const loginUserService = async (
  data: ILogin
): Promise<ILoginResponse> => {
  const user = new User();
  const isUser: any = await user.isUserExist(data.phoneNumber);

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
    { id: isUser?.id, role: isUser.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = createToken(
    { id: isUser?.id, role: isUser.role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const refreshTokenService = async (token: string): Promise<string> => {
  let decodedData = null;
  try {
    decodedData = varifyToken(token, config.jwt.refresh_secret as Secret);
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, "refresh token is not valid");
  }

  const { id } = decodedData;
  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "user does not exist");
  }

  const accessToken = createToken(
    { id: user._id, role: user.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return accessToken;
};
