import { InferResolvers } from "garph";
import { GraphqlContext } from "..";
import { mutationType, queryType } from "../schema";
import { mutationResolvers } from "./mutations";
import { queryResolvers } from "./query";

export type GraphqlResolvers = InferResolvers<
  { Query: typeof queryType; Mutation: typeof mutationType },
  { context: GraphqlContext }
>;

export type GraphqlQueries = GraphqlResolvers["Query"];
export type GraphqlMutations = GraphqlResolvers["Mutation"];

export const graphqlResolvers: GraphqlResolvers = {
  Query: queryResolvers,
  Mutation: mutationResolvers,
};
