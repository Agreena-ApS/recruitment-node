import express, { Request, Response } from "express";
import config from "config";
import * as mongoose from "mongoose";
const app = express();
import colors from "colors/safe";
import { connectDb } from "./app/startup/db";
import { middleware } from "./app/startup/middleware";
import { checkConfig } from "./app/startup/config";
import routes from "./app/startup/routes";
import loaders from "./app/startup/loaders";
const port: number = config.get("applicationPort");
declare global {
  namespace Express {
    interface Request {
      filters?: string;
      user?: any;
      modelName?: string;
      authenticated?: boolean;
    }
  }
}
const server = app.listen(port, async () => {
  connectDb();
  checkConfig();
  middleware(app);
  routes(app);
  await loaders();
  console.log(colors.bold(`Listening on port ${port}...`));
  server.emit("appReady");
});
export default app;
