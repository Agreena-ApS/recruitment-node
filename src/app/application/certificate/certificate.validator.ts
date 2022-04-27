import Validator from "../../helper/validator/index";
import { check, body, query, param, validationResult } from "express-validator";
import errors from "../../enums/errors";
import nouns from "../../enums/nouns";
import Certificate from "./certificate.model";
import User from "../user/user.model";
import CertificateTypesEnum from "../../enums/certificateTypes.enum";
class CertificateValidator extends Validator {
  create() {
    return [
      body("certificate.country")
        .exists({ checkFalsy: true })
        .withMessage(errors.FILL_REQUIRED_FIELD(nouns.COUNTRY)),
    ];
  }
  checkId() {
    return [
      param("id")
        .exists({ checkFalsy: true })
        .isMongoId()
        .withMessage(errors.INVALID(nouns.CERTIFICATE))
        .custom(async (value, { req }) => {
          let filter: any = {
            _id: value,
          };
          const userId =
            req.user.userType !== "admin" ? req.user.id : undefined;
          filter = userId
            ? {
                _id: value,
                $or: [{ owner: { $exists: false } }, { owner: req.user.id }],
              }
            : filter;
          if (!(await Certificate.findOne(filter))) {
            throw new Error(errors.NOT_FOUND(nouns.CERTIFICATE));
          }
          return true;
        }),
    ];
  }
  query() {
    return [
      query("status")
        .optional({ checkFalsy: false })
        .isIn(CertificateTypesEnum)
        .withMessage(
          errors.SHOULD_BE_IN_X_ARRAY(nouns.STATUS, CertificateTypesEnum)
        ),
    ];
  }
  updateOwner() {
    return [
      body("certificate.owner")
        .exists({ checkFalsy: true })
        .withMessage(errors.FILL_REQUIRED_FIELD(nouns.USER))
        .bail()
        .isMongoId()
        .withMessage(errors.INVALID(nouns.USER))
        .bail()
        .custom(async (value, { req }) => {
          if (!(await User.findOne({ _id: value }))) {
            throw new Error(errors.NOT_FOUND(nouns.USER));
          }
          return true;
        }),
    ];
  }
}
export const certificateValidator = new CertificateValidator();
