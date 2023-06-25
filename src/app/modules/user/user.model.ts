import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import { IUser, IUserMethods, UserModel } from "./user.interface";
import config from "../../../config";
import { ApiError } from "../../../error/ApiError";
import httpStatus from "http-status";

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        middleName: {
          type: String,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["seller", "buyer"],
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    income: {
      type: Number,
      required: true,
      default: 0,
    },
    budget: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.methods.isUserExist = async function (
  phoneNumber: string
): Promise<IUser | null> {
  return await User.findOne({ phoneNumber });
};

userSchema.statics.isPasswordCorrect = async function (
  savedPassword: string,
  givenPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

userSchema.pre("save", async function (next) {
  const user = await User.findOne({ phoneNumber: this.phoneNumber });
  if (user) {
    throw new ApiError(httpStatus.CONFLICT, "user already exist");
  }
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_solt_label)
  );

  next();
});

export const User = model<IUser, UserModel>("user", userSchema);
