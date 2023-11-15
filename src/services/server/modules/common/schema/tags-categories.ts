import { z } from "zod";

export const TagCategoryType = Object.freeze({
  LIST: "LIST",
  ITEM: "ITEM",
});

export type TagCategoryType =
  (typeof TagCategoryType)[keyof typeof TagCategoryType];

export const tagsCategoriesRequestSchema = z.object({
  type: z.enum([TagCategoryType.LIST, TagCategoryType.ITEM]).optional(),
});

export const tagsCategoriesResponseSchema = z.object({
  tags: z.array(z.string()),
  categories: z.array(z.string()),
});

export type TagsCategoriesRequest = z.infer<typeof tagsCategoriesRequestSchema>;
export type TagsCategoriesResponse = z.infer<
  typeof tagsCategoriesResponseSchema
>;
