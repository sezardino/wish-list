import { categoriesQueryType } from "./categories";
import { isLoginAvailableQueryType } from "./is-login-available";
import { listsQueryType } from "./list";
import { tagsQueryType } from "./tags";

export const queries = {
  isLoginAvailable: isLoginAvailableQueryType,
  tags: tagsQueryType,
  categories: categoriesQueryType,
  lists: listsQueryType,
};
