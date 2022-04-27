import express, { Request, Response } from "express";
const router = express.Router();
import { certificateController } from "../../helper/controller/controllers";
import { certificateValidator } from "../../helper/validator/validators";
import match from "../../middleware/match";
import { validate, validateExistence } from "../../middleware/validate";
import { checkToken } from "../../security/jwt.service";

router
  .route("/")
  .post(
    checkToken,
    certificateValidator.create(),
    validate,
    match,
    certificateController.create
  )
  .get(
    checkToken,
    certificateValidator.query(),
    validate,
    match,
    certificateController.getCertificates
  );
router
  .route("/:id")
  .put(
    checkToken,
    certificateValidator.checkId(),
    certificateValidator.updateOwner(),
    validate,
    match,
    certificateController.changeCertificateOwner
  )
  .get(
    checkToken,
    certificateValidator.checkId(),
    validate,
    match,
    certificateController.getOneCertificate
  );
export default router;
