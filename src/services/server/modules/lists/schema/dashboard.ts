import { z } from "zod";

export const dashboardListsRequestSchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  page: z.number().optional(),
  limit: z.number().optional(),
});

export const dashboardListsResponseSchema = z.object({
  name: z.string(),
});

export type DashboardListsRequest = z.infer<typeof dashboardListsRequestSchema>;
export type DashboardListsResponse = z.infer<
  typeof dashboardListsResponseSchema
>;
