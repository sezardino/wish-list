import { QueryArguments } from "@/libs/graphql";

export type TagsAndCategoriesRequest = Partial<
  Pick<QueryArguments, "categories" | "tags">
>;
