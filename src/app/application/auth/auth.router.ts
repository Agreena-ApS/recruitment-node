import express, { Request, Response } from "express";
const router = express.Router();
import { authController } from "./auth.controller";
import { authValidator } from "./auth.validator";
import match from "../../middleware/match";
import { validate, validateExistence } from "../../middleware/validate";

router
  .route("/sign-up")
  .post(authValidator.signUp(), validate, match, authController.signUp);

router
  .route("/sign-in/:type")
  .post(authValidator.signIn(), validate, match, authController.signIn);
export default router;
