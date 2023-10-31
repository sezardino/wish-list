import { InferResolvers, InferArgs, Infer } from "garph";
import { queryType, mutationType } from ".";
import { GraphqlContext } from "..";

export type GraphqlResolvers = InferResolvers<
  { Query: typeof queryType; Mutation: typeof mutationType },
  { context: GraphqlContext }
>;

export type QueryArguments = InferArgs<typeof queryType>;
export type QueryReturn = Infer<typeof queryType>;
export type MutationArguments = InferArgs<typeof mutationType>;
export type MutationReturn = Infer<typeof mutationType>;

export type GraphqlQueries = GraphqlResolvers["Query"];
export type GraphqlMutations = GraphqlResolvers["Mutation"];
