import { MutationArguments } from "@/libs/graphql";

export type RegistrationDto = MutationArguments["registration"];

export type LoginDto = {
  login: string;
  password: string;
};
