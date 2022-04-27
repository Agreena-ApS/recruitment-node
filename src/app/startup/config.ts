import config from "config";

export  function checkConfig() {
  if (!config.get("jwtSettings")) {
    throw new Error("FATAL ERROR: jwtSettings is not defined.");
  }
};
