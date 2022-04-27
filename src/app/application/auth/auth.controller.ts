import { Request, Response } from "express";
import messages from "../../enums/messages";
import nouns from "../../enums/nouns";
import status from "../../enums/status";
import errors from "../../enums/errors";
import Controller from "../../helper/controller/index";
import returnResponse from "../../utils/responseFactory";
import { authService } from "./auth.service";

class AuthController extends Controller {
  async signUp(req: Request, res: Response, next: any) {
    try {
      const result = await authService.signUp(req.body.user);
      return returnResponse(
        res,
        status.CREATED,
        messages.USER_SIGNED_UP_SUCCESSFULLY,
        null,
        result
      );
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async signIn(req: Request, res: Response, next: any) {
    try {
      const result = await authService.signIn(
        req.body.credentials,
        req.params.type
      );
      return returnResponse(
        res,
        result.status,
        result.message,
        result.error,
        result.data
      );
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async refreshTheAccessToken(req: Request, res: Response, next: any) {
    try {
      const result = await authService.refreshTheAccessToken(
        req.body.refreshToken
      );
      return returnResponse(
        res,
        result.status,
        null,
        result.error,
        result.data
      );
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async revokeRefreshToken(req: Request, res: Response, next: any) {
    try {
      const { userIds } = req.body;
      const result: any = await authService.revokeRefreshToken(userIds);
      return returnResponse(
        res,
        result.deletedCount < 1 ? status.NOT_FOUND : status.OK,
        result.deletedCount > 0
          ? messages.ACCESS_REVOKED_SUCCESSFULLY(result.deletedCount)
          : null,
        result.deletedCount < 1
          ? errors.X_DOES_NOT_HAVE_Y(nouns.USER, nouns.ACTIVE_TOKEN)
          : null,
        result
      );
    } catch (error) {
      next(error);
    }
  }

  async changePassword(req: any, res: Response, next: any) {
    try {
      const userId = req.user.id;
      const { password, newPassword } = req.body;
      const result = await authService.changePassword(
        userId,
        password,
        newPassword,
      );
      return returnResponse(
        res,
        result ? status.OK : status.VALIDATION_ERROR,
        result ? messages.DATA_EDITED_SUCCESSFULLY(nouns.PASSWORD) : null,
        result ? null : errors.INCORRECT_PASSWORD,
        null
      );
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
