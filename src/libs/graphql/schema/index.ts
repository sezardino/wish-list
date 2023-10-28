import { Infer, InferArgs, buildSchema, g } from "garph";
import { ItemGQL, ListGQL, UserGQL } from "../entity";
import { graphqlResolvers } from "../resolvers";
import { isLoginAvailableQueryType } from "./query/is-login-available";

export const queryType = g.type("Query", {
  isLoginAvailable: isLoginAvailableQueryType,
  // not ready
  lists: g.ref(ListGQL).list().description("Get all lists"),
  list: g
    .ref(ListGQL)
    .args({
      id: g.string().optional(),
      hash: g.string().optional(),
      categories: g.string().list().optional(),
    })
    .description("Get needed list"),
  item: g.ref(ItemGQL).args({ id: g.string() }).description("Get needed item"),
  categories: g
    .string()
    .list()
    .args({ listId: g.string().optional() })
    .description("Get all categories"),
});

export const mutationType = g.type("Mutation", {
  registration: g
    .boolean()
    .args({ login: g.string(), password: g.string() })
    .description("Registration"),
  deleteAccount: g.ref(UserGQL).description("Delete account"),
  // LIST
  createList: g
    .ref(ListGQL)
    .args({ name: g.string() })
    .description("Create list"),
  updateList: g
    .ref(ListGQL)
    .args({ name: g.string() })
    .description("Create list"),
  deleteList: g
    .ref(ListGQL)
    .args({ id: g.string() })
    .description("Delete list"),
  generateHashForList: g.ref(ListGQL).description("Generate hash for list"),
  makeListPublic: g.ref(ListGQL).description("Make list public"),
  // LIST
  addItemToList: g
    .ref(ItemGQL)
    .args({ name: g.string(), list: g.string() })
    .description("Add item to list"),
  updateItemInList: g
    .ref(ItemGQL)
    .args({ id: g.string() })
    .description("Update item"),
});

export type QueryArguments = InferArgs<typeof queryType>;
export type QueryReturn = Infer<typeof queryType>;
export type MutationArguments = InferArgs<typeof mutationType>;
export type MutationReturn = Infer<typeof mutationType>;

export const graphqlSchema = buildSchema({
  g,
  resolvers: graphqlResolvers,
});
