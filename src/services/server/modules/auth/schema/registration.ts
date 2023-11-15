import { z } from "zod";

export const registrationSchema = z.object({
  login: z
    .string()
    .min(1, "backend-errors.validation.registration.login.min")
    .max(20, "backend-errors.validation.registration.login.max"),
  password: z
    .string()
    .min(6, "backend-errors.validation.registration.password"),
});

export type RegistrationDto = z.infer<typeof registrationSchema>;
