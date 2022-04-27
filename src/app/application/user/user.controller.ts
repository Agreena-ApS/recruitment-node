import { Request, Response, NextFunction } from "express";
import messages from "../../enums/messages";
import nouns from "../../enums/nouns";
import status from "../../enums/status";
import Controller from "../../helper/controller/index";

import { userService } from "../../helper/service/services";
import returnResponse from "../../utils/responseFactory";
class UserController extends Controller {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.create(req.body.user);
      return returnResponse(
        res,
        status.OK,
        messages.DATA_SUBMITTED_SUCCESSFULLY(nouns.USER),
        null,
        result
      );
    } catch (error) {
      next(error);
    }
  }
  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.getUsers(req.body.user);
      return returnResponse(res, status.OK, null, null, result);
    } catch (error) {
      next(error);
    }
  }
}
export const userController = new UserController();
