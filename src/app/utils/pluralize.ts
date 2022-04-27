import pluralize from "pluralize";

export = {
  pluralize(input: any) {
    return pluralize.plural(input);
  },
  singularize(input: any) {
    return pluralize.singular(input);
  },
};
