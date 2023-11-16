import { z } from "zod";
import { TagCategoryType } from "../../tags/schema";

export const categoriesListRequestSchema = z.object({
  type: z.enum([TagCategoryType.LIST, TagCategoryType.ITEM]).optional(),
});

export const categoriesListResponseSchema = z.object({
  categories: z.array(z.string()),
});

export type CategoriesListRequest = z.infer<typeof categoriesListRequestSchema>;
export type CategoriesListResponse = z.infer<
  typeof categoriesListResponseSchema
>;
