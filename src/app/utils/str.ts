import pluralize from "./pluralize";
import _ from "lodash";

export = {
  toSnakeCase: (str: string) => {
    return _.snakeCase(str);
  },

  toUpper: (str: string) => {
    return _.upperCase(str);
  },
  toLower: (str: string) => {
    return _.lowerCase(str);
  },
  toCamelCase: (str: string) => {
    return _.camelCase(str);
  },
  toSingular: (str: string) => {
    return pluralize.singularize(str);
  },
  toPlural: (str: string) => {
    return pluralize.pluralize(str);
  },
  toURLPath: (str: string) => {
    return pluralize.pluralize(_.kebabCase(str));
  },
  addDotAtTheEnd: (str: string) => {
    return typeof str !== "string" || str.endsWith(".") ? str : str + ".";
  },
};
