import { g } from "garph";

export const ItemGQL = g.type("User", {
  id: g.string(),
  name: g.string(),
  category: g.string(),
  price: g.int(),
  listId: g.string(),
});
