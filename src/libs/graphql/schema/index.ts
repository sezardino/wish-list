export * from "./types";

import { buildSchema, g } from "garph";

import { GraphqlResolvers } from ".";
import { mutationResolvers } from "../resolvers/mutations";
import { queryResolvers } from "../resolvers/query";
import { mutations } from "./mutation";
import { queries } from "./query";

export const queryType = g.type("Query", queries);
export const mutationType = g.type("Mutation", mutations);

export const graphqlResolvers: GraphqlResolvers = {
  Query: queryResolvers,
  Mutation: mutationResolvers,
};

export const graphqlSchema = buildSchema({
  g,
  resolvers: graphqlResolvers,
});
