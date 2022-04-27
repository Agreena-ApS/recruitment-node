export = {
  OK: {
    title: "ok",
    code: "0000",
    httpCode: 200,
  },
  CREATED: {
    title: "created",
    code: "0001",
    httpCode: 201,
  },
  NOT_FOUND: {
    title: "not_found",
    code: "0002",
    httpCode: 404,
  },
  VALIDATION_ERROR: {
    title: "validation_error",
    code: "0003",
    httpCode: 400,
  },
  MAX_UPLOAD_SIZE_EXCEEDED: {
    title: "max_upload_size_exceeded",
    code: "0004",
    httpCode: 400,
  },
  CONFLICT: {
    // conflict on version
    title: "conflict",
    code: "0005",
    httpCode: 409,
  },
  RESOURCE_EXIST: {
    // if resource already exists
    title: "resource_exist",
    code: "0006",
    httpCode: 409,
  },
  BAD_REQUEST: {
    title: "bad_request",
    code: "0007",
    httpCode: 400,
  },
  UNAUTHORIZED: {
    // may user authenticated but not have required privileges
    title: "unauthorized",
    code: "0008",
    httpCode: 401,
  },
  FORBIDDEN: {
    // user not authenticated
    title: "forbidden",
    code: "0009",
    httpCode: 403,
  },
  TOKEN_EXPIRED: {
    title: "token_expired",
    code: "000A",
    httpCode: 403,
  },
  SIGN_IN_REQUIRED: {
    title: "sign_in_required",
    code: "000B",
    httpCode: 403,
  },
  NOT_VERIFIED: {
    title: "not_verified",
    code: "000C",
    httpCode: 403,
  },
  UNSUPPORTED_MEDIA_TYPE: {
    title: "unsupported_media_type",
    code: "000D",
    httpCode: 400,
  },
  INTERNAL_SERVER_ERROR: {
    title: "internal_server_error",
    code: "ZZZZ",
    httpCode: 500,
  },
  API_RATE_LIMIT_REACHED: {
    title: "api_rate_limit_reached",
    code: "000F",
    httpCode: 429,
  },
  TOO_FAST: {
    title: "too_fast",
    code: "000G",
    httpCode: 429,
  },
  NOT_PERMITTED_ACTION: {
    title: "not_permitted_action",
    code: "000H",
    httpCode: 400,
  },
  INVALID_TOKEN: {
    title: "invalid_token",
    code: "000I",
    httpCode: 403,
  },
  GONE: {
    title: "gone",
    code: "000J",
    httpCode: 410,
  },
  INVALID_JSON: {
    title: "invalid_json",
    code: "000H",
    httpCode: 400,
  },
};
