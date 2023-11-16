import { z } from "zod";

export const createListRequestSchema = z.object({
  name: z.string(),
  icon: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  description: z.string().optional(),
});

export const createListResponseSchema = z.object({
  create: z.boolean(),
});

export type CreateListRequest = z.infer<typeof createListRequestSchema>;
export type CreateListResponse = z.infer<typeof createListResponseSchema>;
