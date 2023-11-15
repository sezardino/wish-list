import { z } from "zod";

export const isLoginAvailableRequestSchema = z.object({
  login: z
    .string()
    .min(1, "backend-errors.validation.registration.login.min")
    .max(20, "backend-errors.validation.registration.login.max"),
});

export const isLoginAvailableResponseSchema = z.object({
  available: z.boolean(),
});

export type IsLoginAvailableRequest = z.infer<
  typeof isLoginAvailableRequestSchema
>;

export type IsLoginAvailableResponse = z.infer<
  typeof isLoginAvailableResponseSchema
>;
