import { ListPrivacy } from "@prisma/client";
import { g } from "garph";
import { ItemGQL } from ".";
import { DateGQL } from "./scalars";

export const ListPrivacyGQL = g.enumType("ListPrivacy", ListPrivacy);

export const ListGQL = g.type("List", {
  id: g.id(),

  name: g.string(),
  category: g.string().optional(),
  tags: g.string().list(),
  description: g.string(),
  icon: g.string().optional(),

  privacy: ListPrivacyGQL,
  averagePrice: g.float().optional(),

  ownerId: g.string(),
  hash: g.string().optional(),
  items: g.ref(ItemGQL).list(),

  createdAt: DateGQL,
  updatedAt: DateGQL,
});
