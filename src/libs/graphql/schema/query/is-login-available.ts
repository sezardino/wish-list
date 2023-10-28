import { g } from "garph";

export const isLoginAvailableQueryType = g
  .boolean()
  .args({ login: g.string() });
