import { paginatedRequestSchema, paginatedResponseSchema } from "@/types";
import { z } from "zod";
import { TagCategoryType } from "../../tags/schema";

export const categoriesListRequestSchema = z
  .object({
    type: z.enum([TagCategoryType.LIST, TagCategoryType.ITEM]).optional(),
  })
  .merge(paginatedRequestSchema);

export const categoriesListResponseSchema = z
  .object({
    categories: z.array(z.string()),
  })
  .merge(paginatedResponseSchema);

export type CategoriesListRequest = z.infer<typeof categoriesListRequestSchema>;
export type CategoriesListResponse = z.infer<
  typeof categoriesListResponseSchema
>;
