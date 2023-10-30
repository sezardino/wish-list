import { MutationArguments } from "@/libs/graphql/schema";

export type CreateListDto = MutationArguments["createList"] & {
  ownerId: string;
};
