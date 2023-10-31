import { QueryArguments } from "@/libs/graphql";

export type TagsDto = QueryArguments["tags"] & {
  ownerId: string;
};

export type CategoriesDto = QueryArguments["categories"] & {
  ownerId: string;
};
