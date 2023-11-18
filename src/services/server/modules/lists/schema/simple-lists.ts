import { paginatedRequestSchema, paginatedResponseSchema } from "@/types";
import { z } from "zod";

export const simpleListsRequestSchema = z
  .object({})
  .merge(paginatedRequestSchema);

export const simpleListResponseSchema = z
  .object({
    lists: z.array(
      z.object({
        name: z.string(),
        id: z.string(),
      })
    ),
  })
  .merge(paginatedResponseSchema);

export type SimpleListsRequest = z.infer<typeof simpleListsRequestSchema>;
export type SimpleListsResponse = z.infer<typeof simpleListResponseSchema>;
