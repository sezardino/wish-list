import { g } from "garph";
import { TagCategoryGQL } from "../../entity/scalars";

export const categoriesQueryType = g
  .string()
  .list()
  .args({ type: TagCategoryGQL });
