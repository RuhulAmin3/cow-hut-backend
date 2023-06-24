import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
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
