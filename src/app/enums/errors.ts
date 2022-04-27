export = {
  SIGN_UP_FAILED: "Sign up failed.",
  FORBIDDEN_IP: "You do not have permission to access this page with this IP",
  IP_EXIST: "The IP exists",
  INVALID_IP: "The IP is invalid",
  QUERY_PARAMS: "Query Params inputs are invalid",
  FILL_ALL_REQUIRED_FIELDS: "Please enter all required fields.",
  REQUIRED: "Required",
  USERNAME_OR_PASSWORD_NOT_VALID: "Wrong username or password",
  INCORRECT_PASSWORD: "The password entered is incorrect",
  ACCOUNT_IS_NOT_ACTIVATED: "Your account has not been activated",
  ACTIVATION_CODE_IS_WRONG: "The activation code is wrong",
  CATEGORY_NOT_FOUND: "The category not found",
  PARENT_CATEGORY_NOT_FOUND: "Parent category not found",
  PARENT_CATEGORY_ERROR: "The category of parent cannot be his parent",
  PRODUCT_DOES_NOT_FOUND: "Product not found",
  INVALID_INPUT: "Invalid input",
  INVALID_TOKEN: "The security token is invalid",
  TOKEN_EXPIRED: "The token has been expired",
  INTERNAL_SERVER_ERROR: "Internal server error",
  UNAUTHORIZED: "Authorization needed",
  FORBIDDEN: "Unauthorized access",
  SIGN_IN_REQUIRED: "You need to sign in again",
  GONE: "Your request could not be processed because information about this resource/page has changed. Please reload the page",
  INVALID_JSON: "Invalid Json",
  LARGE_IMAGE: "Image size is too large",
  NOT_SET_PASSWORD: "Password has not set for you",
  TOO_FAST: (reqTime: string, timeUnit: string) => {
    return `It is not possible to resend the activation code until ${reqTime} ${timeUnit}.`;
  },
  NOT_VALID: (noun: string) => {
    return `${noun} entered not valid`;
  },
  EXIST: (noun: string) => {
    return `${noun} exists.`;
  },
  NOT_FOUND: (noun = "") => {
    return `${noun + (noun ? " " : "")}not found`;
  },
  LEAST_X_CHARACTERS_AND_MAX_Y_CHARACTERS(noun: string, x: number, y: number) {
    return `${noun} must be a minimum of ${x} and a maximum of ${y} Characters`;
  },
  MAX_X_CHARACTERS(noun: string, x: number) {
    return `${noun} must be at most ${x} characters`;
  },
  MIN_X_CHARACTERS(noun: string, x: number) {
    return `${noun} must be at least ${x} characters`;
  },
  MIN_X_ITEMS(noun: string, x: string) {
    return `The number of ${noun} must be at least ${x}`;
  },
  CAN_NOT_DELETE_BECAUSE_X_HAS_RELATION_TO_Y(x: string, y: string) {
    return `Unable to delete ${x} because it has relation with ${y}. Please delete the relation first`;
  },
  EXPIRED(x: string) {
    return `${x} has expired`;
  },
  INVALID(x: string) {
    return `${x} is invalid`;
  },
  CAN_NOT_SIGN_IN_UNTIL_SECONDS(x: string) {
    return `Unable to sign in for up to ${x} seconds`;
  },
  CAN_NOT_CREATE_MORE_THAN_X(noun: string, x: string) {
    return `Cannot create more than ${x} ${noun}.`;
  },
  SHOULD_BE_INTEGER(noun: string) {
    return `${noun} should be integer`;
  },
  SHOULD_BE_STRING(noun: string) {
    return `${noun} should be string`;
  },
  SHOULD_BE_BOOLEAN(noun: string) {
    return `${noun} should be boolean`;
  },
  SHOULD_BE_ARRAY(noun: string) {
    return `${noun} should be array`;
  },
  SHOULD_BE_UUID(noun: string) {
    return `${noun} should be UUID`;
  },
  SHOULD_BE_INT_AND_GT_X(noun: string, x: string) {
    return `${noun} should be integer and greater than ${x}`;
  },

  SHOULD_BE_DATE(noun: string) {
    return `${noun} should be of Date type`;
  },
  SHOULD_BE_TIMESTAMP(noun: string) {
    return `${noun} should be of the Timestamp type with the format YYYY-MM-DDTHH:mm:ssZ`;
  },
  SHOULD_BE_BEFORE(noun: string) {
    return `${noun} should be before than todays date`;
  },
  FROMDATE_SHOULD_BE_BEFORE_TODATE() {
    return `The time interval is incorrect `;
  },
  SHOULD_BE_UNIXTIME(noun: string) {
    return `${noun} should be Unixtime`;
  },
  SHOULD_BE_JSON(noun: string) {
    return `${noun} should be Json`;
  },
  SHOULD_BE(noun: string, whatToBe: string) {
    return `The ${noun} should be ${whatToBe}`;
  },
  CAN_NOT_USE(noun: string) {
    return `You have not permission to use ${noun}`;
  },
  ALLOWED_VALUE_FOR_X_IS_Y(x: string, y: string) {
    return `Allowed values for ${x} is ${y}`;
  },
  LEAST_X_AND_MAX_Y(noun: string, x: number, y: number) {
    return `The ${noun} must be at least ${x} and at most ${y}`;
  },
  ALREADY_VALIDATED(noun: string) {
    return `Your ${noun} is approved`;
  },
  SHOULD_BE_INTEGER_AND_GREATER_THAN_X(noun: string, x: string) {
    return `The ${noun} should be an integer and greater than ${x}.`;
  },

  FILL_X_FIELDS(noun: string) {
    return `Please fill the ${noun} field`;
  },

  SHOULD_BE_IN_X_ARRAY(noun: string, x: Array<string>) {
    return `${noun} should be in [${x.toString()}] values.`;
  },
  FILL_REQUIRED_FIELD(noun: string) {
    return `${noun} is required`;
  },
  IS_PROTECTED(noun: string) {
    return `This ${noun} is protected and cannot be deleted or edited`;
  },
  ONE_OR_MORE_RESOURCE_IS_PROTECTED(noun: string) {
    return `One or more selected ${noun} are protected and cannot be deleted or edited`;
  },
  ONE_OR_MORE_RESOURCE_NOT_EXIST(noun: string) {
    return `One or more of the selected ${noun} not exist`;
  },

  X_DOES_NOT_HAVE_Y(x: string, y: string) {
    return `${x} does not have ${y} `;
  },
  X_SHOULD_BE_REVIEWED_BEFORE_USE(x: string, action: string) {
    return `The status of ${x} must be reviewed before ${action}.`;
  },
  CAN_NOT_STARTS_WITH(noun: string, char: string) {
    return `${noun} can not start with ${char}`;
  },
  CAN_NOT_ENDS_WITH(noun: string, char: string) {
    return `${noun} can not end with ${char}`;
  },
  INVALID_ROLE_FOR_THIS_USER_TYPE(roleName: string) {
    return `the ${roleName} role is not applicable for this type of user`;
  },
  CAN_NOT_CHANGE_X_FIELD(x: string, modelName: string) {
    return `Unable to update the ${x}. First delete ${modelName} and then create it again`;
  },

  CAST_ERROR: "Cast Error - Probably wrong query",
  FILE_NOT_PROVIDED: "File not uploaded",

  MODIFY_ENTRIES: "Please modify the inputs",

  USERNAME_ALREADY_SET: "You have already entered your username",

  PAYMENT_GATEWAY_DOUBLE_SPENDING: "This payment has already been made",

  ORDER_COST_ALREADY_PAID: "The cost of this order has been paid",

  MULTER_FILE_UPLOAD_ERROR: "Error uploading file",

  USER_DOES_NOT_HAVE_ANY_ROLE_CALL_ADMIN:
    "No role has been assigned to this user. Please contact the system administrator.",
};
