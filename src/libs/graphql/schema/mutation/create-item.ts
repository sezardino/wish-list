import { g } from "garph";
import { ItemGQL } from "../../entity";
import { LinkGQL } from "../../entity/link";

export const createItemMutationType = g
  .ref(ItemGQL)
  .args({
    name: g.string(),
    description: g.string().optional(),
    averagePrice: g.float().optional(),
    category: g.string().optional(),
    tags: g.string().optional().list().optional(),
    listId: g.id(),
    links: g.ref(LinkGQL).list().optional(),
  })
  .description("Create item");
