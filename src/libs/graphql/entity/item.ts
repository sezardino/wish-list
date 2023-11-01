import { ItemPriority, ItemStatus } from "@prisma/client";
import { g } from "garph";
import { LinkGQL } from "./link";
import { DateGQL } from "./scalars";

export const ItemStatusGQL = g.enumType("ItemStatus", ItemStatus);
export const ItemPriorityGQL = g.enumType("ItemPriority", ItemPriority);

export const ItemGQL = g.type("Item", {
  id: g.id(),
  name: g.string(),
  averagePrice: g.int(),
  description: g.string(),

  category: g.string().optional(),
  tags: g.string().optional().list().optional(),

  listId: g.id(),
  links: g.ref(LinkGQL).list().optional(),
  // add links

  status: ItemStatusGQL,
  priority: ItemPriorityGQL,

  createdAt: DateGQL,
  updatedAt: DateGQL,
});
