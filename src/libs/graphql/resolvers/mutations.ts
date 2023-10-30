import { bllService } from "@/services/bll";
import { GraphqlResolvers } from ".";

export const mutationResolvers: GraphqlResolvers["Mutation"] = {
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
};
