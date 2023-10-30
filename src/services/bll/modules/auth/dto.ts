import { MutationArguments } from "@/libs/graphql/schema";

export type RegistrationDto = MutationArguments["registration"];

export type LoginDto = {
  login: string;
  password: string;
};
