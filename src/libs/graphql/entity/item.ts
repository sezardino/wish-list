import { ItemPriority, ItemStatus } from "@prisma/client";
import { g } from "garph";
import { DateGQL } from "./scalars";

export const ItemStatusGQL = g.enumType("ItemStatus", ItemStatus);
export const ItemPriorityGQL = g.enumType("ItemPriority", ItemPriority);

export const ItemGQL = g.type("User", {
  id: g.id(),
  name: g.string(),
  averagePrice: g.int(),
  description: g.string(),

  category: g.string().optional(),
  tags: g.string().optional().list().optional(),

  listId: g.id(),

  // add links

  status: ItemStatusGQL,
  priority: ItemPriorityGQL,

  createdAt: DateGQL,
  updatedAt: DateGQL,
});
