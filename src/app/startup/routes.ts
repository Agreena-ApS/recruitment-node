import { Request, Response } from "express";
import router from "../helper/router/index";
import globalExceptionHandlerController from "../helper/controller/globalExceptionHandler.controller";
export = function routes(app: any) {
  app.use(
    "/api",
    (req: Request, res: Response, next: any) => {
      console.log(`${req.method} ${req.originalUrl} from ${req.ip}`);
      next();
    },
    router
  );
  app.use((err: any, req: Request, res: Response, next: any) => {
    globalExceptionHandlerController.handleException(err, req, res, next);
  });
};
