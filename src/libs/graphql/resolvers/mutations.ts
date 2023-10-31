import { bllService } from "@/services/bll";
import { GraphqlMutations } from "..";

export const mutationResolvers: GraphqlMutations = {
  registration: async (_, { login, password }, { user }) => {
    if (user) throw new Error("You are already registered");

    return await bllService.auth.registration({ login, password });
  },

  createList: async (_, args, { user }) => {
    if (!user) throw new Error("You are not authorized");

    return await bllService.list.create({
      ...args,
      ownerId: user.id,
    });
  },

  createItem: async (_, args, { user }) => {
    if (!user) throw new Error("You are not authorized");

    return await bllService.item.create({
      ...args,
      ownerId: user.id,
    });
  },
};
