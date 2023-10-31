import { categoriesQueryType } from "./categories";
import { isLoginAvailableQueryType } from "./is-login-available";
import { tagsQueryType } from "./tags";

export const queries = {
  isLoginAvailable: isLoginAvailableQueryType,
  tags: tagsQueryType,
  categories: categoriesQueryType,
};
