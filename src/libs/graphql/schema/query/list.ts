import { g } from "garph";
import { ListGQL } from "../..";
import { TagCategoryGQL } from "../../entity/scalars";

export const listsQueryType = g
  .ref(ListGQL)
  .list()
  .args({ type: g.ref(TagCategoryGQL).optional() });
