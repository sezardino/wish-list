import { MutationArguments } from "@/libs/graphql";

export type CreateItemDto = MutationArguments["createItem"] & {
  ownerId: string;
};
