import { g } from "garph";

export const DateGQL = g.scalarType<Date, string>("Date", {
  serialize: (value) => value.toString(),
  parseValue: (value) => new Date(value),
});
