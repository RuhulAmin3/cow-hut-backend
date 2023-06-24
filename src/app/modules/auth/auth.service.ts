import httpStatus from "http-status";
import { ApiError } from "../../../error/ApiError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { ILogin, ILoginResponse } from "./auth.interface";
import { createToken } from "../../../utils/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";

export const createUserService = async (data: IUser): Promise<IUser> => {
  const result = await User.create(data);
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
