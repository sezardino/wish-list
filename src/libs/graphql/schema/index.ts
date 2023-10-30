import { Infer, InferArgs, buildSchema, g } from "garph";
import { graphqlResolvers } from "../resolvers";
import { createListMutationType } from "./mutation/create-list";
import { registrationMutationType } from "./mutation/registration";
import { isLoginAvailableQueryType } from "./query/is-login-available";

export const queryType = g.type("Query", {
  isLoginAvailable: isLoginAvailableQueryType,
});

export const mutationType = g.type("Mutation", {
  registration: registrationMutationType,
  createList: createListMutationType,
});

export type QueryArguments = InferArgs<typeof queryType>;
export type QueryReturn = Infer<typeof queryType>;
export type MutationArguments = InferArgs<typeof mutationType>;
export type MutationReturn = Infer<typeof mutationType>;

export const graphqlSchema = buildSchema({
  g,
  resolvers: graphqlResolvers,
});
