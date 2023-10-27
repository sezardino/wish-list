import { buildSchema, g } from "garph";
import { ItemGQL, ListGQL, UserGQL } from "./entity";
import { graphqlResolvers } from "./resolvers";

export const queryType = g.type("Query", {
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
    .ref(UserGQL)
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

export const graphqlSchema = buildSchema({
  g,
  resolvers: graphqlResolvers,
});
