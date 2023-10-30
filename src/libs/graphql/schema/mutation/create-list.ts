import { g } from "garph";
import { ListGQL } from "../../entity";

export const createListMutationType = g
  .ref(ListGQL)
  .args({
    name: g.string(),
    // ownerId: g.id(),
    icon: g.string().optional(),
    category: g.string().optional(),
    tags: g.string().optional().list().optional(),
    description: g.string().optional(),
  })
  .description("Create list");
