"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), ".env") });
exports.default = {
    env: process.env.NODE_DEV,
    port: process.env.PORT,
    databaseUrl: process.env.DATABASE_URL,
    jwt: {
        secret: process.env.JWT_SECRET,
        refresh_secret: process.env.JWT_REFRESH_SECRET,
        expires_in: process.env.EXPIRES_IN,
        refresh_expires_in: process.env.REFRESH_EXPIRES_IN,
    },
    bcrypt_solt_label: process.env.BCRYPT_SALT_LABEL,
};
