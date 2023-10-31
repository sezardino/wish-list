import { bllService } from "@/services/bll";
import { GraphqlQueries } from "..";

export const queryResolvers: GraphqlQueries = {
  isLoginAvailable: async (_, { login }) =>
    await bllService.user.isLoginAvailable(login),
};
