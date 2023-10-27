import { g } from "garph";
import { ListGQL } from ".";

export const UserGQL = g.type("User", {
  id: g.string(),
  login: g.string(),
  lists: g.ref(ListGQL).list(),
});
