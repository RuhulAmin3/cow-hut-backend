import { app } from "./app";
import config from "./config";
import mongoose from "mongoose";
import { Server } from "http";

const port = config.port;

process.on("uncaughtException", (err) => {
  console.log("from unhandleException", err);
  process.exit(1);
});

let server: Server;
async function connectDb() {
  try {
    await mongoose.connect(config.databaseUrl as string);
    console.log("database connected successfully");
    server = app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  } catch (err) {
    console.log("database connection failed");
  }

  process.on("unhandledRejection", (err) => {
    if (server) {
      server.close(() => {
        console.log("from unhandleRejection", err);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

connectDb();

process.on("SIGTERM", (err) => {
  console.log("sigterm received error", err);
  if (server) {
    server.close();
  }
});
