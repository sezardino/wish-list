import { g } from "garph";
import { DateGQL } from "./scalars";

export const LinkGQL = g.type("Link", {
  id: g.id(),
  name: g.string(),
  href: g.string(),

  itemId: g.id(),

  createdAt: DateGQL,
  updatedAt: DateGQL,
});

export const LinkInputGQL = g.inputType("LinkInput", {
  name: g.string(),
  href: g.string(),
});
