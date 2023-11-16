import { z } from "zod";

export const loginRequestSchema = z.object({
  login: z.string(),
  password: z.string(),
});

export type LoginRequest = z.infer<typeof loginRequestSchema>;
