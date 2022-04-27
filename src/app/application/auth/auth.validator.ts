import Validator from "../../helper/validator/index";
import { check, body, query, param, validationResult } from "express-validator";
import errors from "../../enums/errors";
import nouns from "../../enums/nouns";
import userTypes from "../../enums/userTypes.enum";
import User from "../user/user.model";
class AuthValidator extends Validator {
  signIn() {
    return [
      check("credentials.username")
        .exists({ checkFalsy: true })
        .withMessage(errors.FILL_REQUIRED_FIELD(nouns.USERNAME))
        .bail()
        .isLength({
          min: 5,
        })
        .withMessage(errors.MIN_X_CHARACTERS(nouns.USERNAME, 5)),

      check("credentials.password")
        .exists({ checkFalsy: true })
        .withMessage(errors.FILL_REQUIRED_FIELD(nouns.PASSWORD)),
      check("type")
        .exists()
        .withMessage(errors.FILL_REQUIRED_FIELD("type"))
        .bail()
        .custom((value) => {
          if (!Object.values(userTypes).includes(value)) {
            throw new Error(errors.INVALID("type"));
          }
          return true;
        }),
    ];
  }

  signUp() {
    return [
      body("user.username")
        .exists()
        .withMessage(errors.FILL_REQUIRED_FIELD(nouns.USERNAME))
        .bail()

        .custom(async (value) => {
          if (await User.exists({ username: value })) {
            throw new Error(errors.EXIST(nouns.USERNAME));
          }
          return true;
        }),
      body("user.email")
        .exists()
        .withMessage(errors.FILL_REQUIRED_FIELD(nouns.EMAIL))
        .bail()
        .isEmail()
        .withMessage(errors.NOT_VALID(nouns.EMAIL))
        .custom(async (value) => {
          if (await User.exists({ email: value })) {
            throw new Error(errors.EXIST(nouns.EMAIL));
          }
          return true;
        }),
      body("user.password")
        .exists()
        .withMessage(errors.FILL_REQUIRED_FIELD(nouns.PASSWORD))
        .bail()
        .isLength({ min: 6, max: 50 })
        .withMessage(
          errors.LEAST_X_CHARACTERS_AND_MAX_Y_CHARACTERS(nouns.PASSWORD, 6, 50)
        ),
      body("user.phoneNumber").optional(),
    ];
  }
}
export const authValidator = new AuthValidator();
