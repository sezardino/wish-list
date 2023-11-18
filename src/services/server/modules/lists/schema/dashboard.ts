import { paginatedRequestSchema, paginatedResponseSchema } from "@/types";
import { z } from "zod";

export const dashboardListsRequestSchema = z
  .object({
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
  })
  .merge(paginatedRequestSchema);

export const dashboardListsResponseSchema = z
  .object({
    lists: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        category: z.string().nullable(),
        description: z.string(),
        icon: z.string().nullable(),
        tags: z.array(z.string()),
        createdAt: z.string(),
        updatedAt: z.string(),
        _count: z.object({
          items: z.number(),
        }),
      })
    ),
  })
  .merge(paginatedResponseSchema);

export type DashboardListsRequest = z.infer<typeof dashboardListsRequestSchema>;
export type DashboardListsResponse = z.infer<
  typeof dashboardListsResponseSchema
>;
