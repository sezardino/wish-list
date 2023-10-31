import { g } from "garph";
import { TagCategoryGQL } from "../../entity/scalars";

export const tagsQueryType = g
  .string()
  .list()
  .args({ type: g.ref(TagCategoryGQL).optional() });
