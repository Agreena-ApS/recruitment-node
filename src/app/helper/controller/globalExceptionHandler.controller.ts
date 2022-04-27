import moment from "moment";
import errors from "../../enums/errors";
import status from "../../enums/status";
import returnResponse from "../../utils/responseFactory";
export = {
  handleException(err: any, req: any, res: any, next: any) {
    if (err.custom) {
      return returnResponse(res, err.status, null, [err.message], null);
    } else {
      if (err.name == "SyntaxError") {
        return returnResponse(
          res,
          status.INVALID_JSON,
          null,
          [errors.INVALID_JSON],
          null
        );
      } else if (err.name == "CastError") {
        return returnResponse(
          res,
          status.VALIDATION_ERROR,
          null,
          errors.CAST_ERROR,
          null
        );
      } else {
        console.log(err);
        console.log(err.custom);
        returnResponse(
          res,
          status.INTERNAL_SERVER_ERROR,
          null,
          [errors.INTERNAL_SERVER_ERROR],
          {
            errMSG: err.message,
            time: moment().unix(),
          }
        );
        throw err;
      }
    }
  },
};
