import { JwtPayload } from "jsonwebtoken";

export type ILogin = {
  phoneNumber: string;
  password: string;
};

export type ILoginResponse = {
  accessToken: JwtPayload;
  refreshToken: JwtPayload;
};
