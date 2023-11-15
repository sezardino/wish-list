import { z } from "zod";

export const isLoginAvailableSchema = z.object({
  login: z
    .string()
    .min(1, "backend-errors.validation.registration.login.min")
    .max(20, "backend-errors.validation.registration.login.max"),
});

export type IsLoginAvailableDto = z.infer<typeof isLoginAvailableSchema>;
