export * from "./entity";
export * from "./resolvers";
export * from "./schema";

import { YogaInitialContext, createYoga } from "graphql-yoga";

import { User } from "next-auth";
import { getNextAuthSession } from "../next-auth";
import { graphqlSchema } from "./schema";

export type GraphqlContext = YogaInitialContext & { user: User };

export const { handleRequest: graphqlRequest } = createYoga<GraphqlContext>({
  schema: graphqlSchema,
  graphqlEndpoint: "/api/graphql",
  fetchAPI: { Request, Response },
  context: async () => {
    const session = await getNextAuthSession();

    return {
      user: session?.user,
    };
  },
});
