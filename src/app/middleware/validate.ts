import { Request, Response } from "express";
import { validationResult } from "express-validator";
import status from "../enums/status";
import returnResponse from "../utils/responseFactory";
const validate = (req: Request, res: Response, next: any) => {
  const validationErrors = validationResult(req);
  if (validationErrors.isEmpty()) {
    return next();
  }
  const extractedErrors: any = [];
  validationErrors
    .array()
    .forEach((err) =>
      extractedErrors.push({ message: err.msg, field: err.param })
    );

  return returnResponse(
    res,
    status.VALIDATION_ERROR,
    null,
    extractedErrors,
    null
  );
};

//The validate method above will always returns validation error status.
//But this method will always returns with NOT_FOUND status and is mostly useful for delete and get requests, because most of the time they don't have any input validation
const validateExistence = (req: Request, res: Response, next: any) => {
  const validationErrors = validationResult(req);
  if (validationErrors.isEmpty()) {
    return next();
  }
  const extractedErrors: any = [];
  validationErrors
    .array()
    .forEach((err) =>
      extractedErrors.push({ message: err.msg, field: err.param })
    );

  return returnResponse(res, status.NOT_FOUND, null, extractedErrors, null);
};
export { validate, validateExistence };
