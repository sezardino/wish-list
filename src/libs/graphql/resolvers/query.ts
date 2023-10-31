import { bllService } from "@/services/bll";
import { GraphqlQueries } from "..";

export const queryResolvers: GraphqlQueries = {
  isLoginAvailable: async (_, { login }) =>
    await bllService.user.isLoginAvailable(login),
  tags: async (_, { type }, { user }) => {
    if (!user) throw new Error("Unauthorized");

    return await bllService.common.tags({
      type,
      ownerId: user.id,
    });
  },
  categories: async (_, { type }, { user }) => {
    if (!user) throw new Error("Unauthorized");

    return await bllService.common.categories({
      type,
      ownerId: user.id,
    });
  },
};
