import { g } from "garph";

export const UserGQL = g.type("User", {
  id: g.string(),
  login: g.string(),
});
