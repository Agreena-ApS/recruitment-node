import { NextFunction, Request, Response } from "express";
import messages from "../../enums/messages";
import nouns from "../../enums/nouns";
import status from "../../enums/status";
import Controller from "../../helper/controller/index";
import { certificateService } from "../../helper/service/services";
import returnResponse from "../../utils/responseFactory";
import mongoose from "mongoose";
class CertificateController extends Controller {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await certificateService.create(req.body.certificate);
      return returnResponse(
        res,
        status.OK,
        messages.DATA_SUBMITTED_SUCCESSFULLY(nouns.CERTIFICATE),
        null,
        result
      );
    } catch (error) {
      next(error);
    }
  }

  async changeCertificateOwner(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await certificateService.updateCertificate(
        req.params.id,
        req.body.certificate
      );
      return returnResponse(
        res,
        status.OK,
        messages.DATA_EDITED_SUCCESSFULLY(nouns.CERTIFICATE),
        null,
        result
      );
    } catch (error) {
      next(error);
    }
  }
  async getCertificates(req: Request, res: Response, next: NextFunction) {
    try {
      const filter =
        req.user.userType !== "admin"
          ? {
              $or: [{ owner: { $exists: false } }, { owner: req.user.id }],
              status: req.query.status,
            }
          : {};
      const result = await certificateService.getCertificates(filter);
      return returnResponse(res, status.OK, null, null, result);
    } catch (error) {
      next(error);
    }
  }
  async getOneCertificate(req: Request, res: Response, next: NextFunction) {
    try {
      const filter =
        req.user.userType !== "admin"
          ? {
              owner: req.user.id,
            }
          : {};
      const result = await certificateService.getOneCertificate(
        new mongoose.Types.ObjectId(req.params.id),
        filter
      );
      return returnResponse(res, status.OK, null, null, result);
    } catch (error) {
      next(error);
    }
  }
}
export const certificateController = new CertificateController();
