import { bllService } from "@/services/bll";
import { GraphqlResolvers } from ".";

export const queryResolvers: GraphqlResolvers["Query"] = {
  isLoginAvailable: async (_, { login }) =>
    await bllService.user.isLoginAvailable(login),
};
