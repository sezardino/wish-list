import { z } from "zod";

export const createItemRequestSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  averagePrice: z.number().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  listId: z.string(),
  links: z
    .array(
      z.object({
        name: z.string(),
        href: z.string(),
      })
    )
    .optional(),
});

export const createItemResponseSchema = z.object({
  create: z.boolean(),
});

export type CreateItemRequest = z.infer<typeof createItemRequestSchema>;
export type CreateItemResponse = z.infer<typeof createItemResponseSchema>;
