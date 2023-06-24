import { Types } from "mongoose";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";

type IJwtData = {
  id: Types.ObjectId;
  role: string;
};

export const createToken = (
  data: IJwtData,
  secret: Secret,
  expireTime: string
): JwtPayload => {
  return jwt.sign(data, secret, {
    expiresIn: expireTime,
  }) as unknown as JwtPayload;
};
