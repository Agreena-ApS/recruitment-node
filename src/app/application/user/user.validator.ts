import Validator from "../../helper/validator/index";
import {
  check,
  body,
  query,
  param,
  validationResult,
} from "express-validator";
import errors from "../../enums/errors";
import nouns from "../../enums/nouns";
class UserValidator extends Validator {
  handle() {
    return [
      body("user.type")
        .exists({ checkFalsy: true })
        .withMessage(errors.FILL_REQUIRED_FIELD(nouns.USER_TYPE)),
      body("user.isActive")
        .exists()
        .withMessage(errors.FILL_REQUIRED_FIELD("isActive"))
        .bail()
        .isBoolean()
        .withMessage(errors.SHOULD_BE_BOOLEAN("isActive")),
        body("user.password")
        .exists()
        .withMessage(errors.FILL_REQUIRED_FIELD(nouns.PASSWORD)),
  
      body("user.adminComment")
        .optional({ checkFalsy: true })
        .isString()
        .withMessage(errors.SHOULD_BE_STRING(nouns.COMMENT))
        .isLength({ max: 2500 })
        .withMessage(errors.MAX_X_CHARACTERS(nouns.COMMENT, 2500)),
    ];
  }
}
export const userValidator = new UserValidator();
