import _ from "lodash";
import str from "./str";

function returnResponse(
  res: any,
  status: any,
  message: any,
  error: any,
  data: any
) {
  let resObject = {
    status: status.title,
    statusCode: status.code,
    message: sanitizeMessage(message),
    errors: sanitizeErrors(error),
    data: sanitizeData(data),
  };
  return res.status(status.httpCode).json(resObject);
}

function sanitizeMessage(message: any) {
  if (!message) {
    return {
      text: "",
      type: "",
    };
  }
  message.length < 2 && (message = message[0]);
  return Array.isArray(message)
    ? message.map((m) => {
        return {
          type: m.type,
          text: _.upperFirst(str.addDotAtTheEnd(m.text.trim())),
        };
      })
    : {
        type: message.type,
        text: _.upperFirst(str.addDotAtTheEnd(message.text.trim())),
      };
}
function sanitizeErrors(error:any) {
  if (!error) {
    return [];
  }
  if (Array.isArray(error)) {
    return error.map((e) => {
      if (e.message) {
        e.message = _.upperFirst(str.addDotAtTheEnd(e.message));
        return e;
      } else {
        return _.upperFirst(str.addDotAtTheEnd(e));
      }
    });
  } else {
    if (error.message) {
      error.message = _.upperFirst(str.addDotAtTheEnd(error.message));
      return [_.upperFirst(error)];
    }
    return [_.upperFirst(str.addDotAtTheEnd(error))];
  }
}
function sanitizeData(data:any) {
  if (!data) {
    data = {};
  }
  return data;
}

export default returnResponse;
