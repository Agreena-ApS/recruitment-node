import express from "express";
const router = express.Router();
import { userController } from "../../helper/controller/controllers";
import {
  userValidator,
  authValidator,
} from "../../helper/validator/validators";
import match from "../../middleware/match";
import { validate, validateExistence } from "../../middleware/validate";
import { checkToken } from "../../security/jwt.service";

router
  .route("/")
  .post(
    checkToken,
    userValidator.handle(),
    authValidator.signUp(),
    validate,
    match,
    userController.create
  )
  .get(checkToken, validate, match, userController.getUsers);

export default router;
