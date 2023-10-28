import { g } from "garph";

export const registrationMutationType = g
  .boolean()
  .args({ login: g.string(), password: g.string() })
  .description("Registration");
