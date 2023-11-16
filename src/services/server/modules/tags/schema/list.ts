import { z } from "zod";

export const TagCategoryType = Object.freeze({
  LIST: "LIST",
  ITEM: "ITEM",
});

export type TagCategoryType =
  (typeof TagCategoryType)[keyof typeof TagCategoryType];

export const tagsListRequestSchema = z.object({
  type: z.enum([TagCategoryType.LIST, TagCategoryType.ITEM]).optional(),
});

export const tagsListResponseSchema = z.object({
  tags: z.array(z.string()),
});

export type TagsListRequest = z.infer<typeof tagsListRequestSchema>;
export type TagsListResponse = z.infer<typeof tagsListResponseSchema>;
