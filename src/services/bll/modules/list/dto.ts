import { MutationArguments } from "@/libs/graphql";

export type CreateListDto = MutationArguments["createList"] & {
  ownerId: string;
};
