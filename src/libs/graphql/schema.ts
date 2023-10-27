import { buildSchema, g } from "garph";
import { ListGQL, ItemGQL } from "./entity";
import { graphqlResolvers } from "./resolvers";

export const queryType = g.type("Query", {
  lists: g.ref(ListGQL).list().description("Get all lists"),
  list: g.ref(ListGQL).args({ id: g.string() }).description("Get needed list"),
  item: g.ref(ItemGQL).args({ id: g.string() }).description("Get needed item"),
});

export const mutationType = g.type("Mutation", {});

export const graphqlSchema = buildSchema({
  g,
  resolvers: graphqlResolvers,
});
