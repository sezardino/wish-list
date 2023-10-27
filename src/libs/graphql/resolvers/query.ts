import { GraphqlResolvers } from ".";

export const queryResolvers: GraphqlResolvers["Query"] = {
  item: async (_, { id }) => {
    return {
      category: "category",
      id,
      listId: "listId",
      name: "name",
      price: 0,
    };
  },
  list: async (_, { id }) => {
    return {
      id,
      name: "name",
      userId: "userId",
      privacy: "PUBLIC",
      hash: "hash",
      ownerId: "ownerId",
    };
  },
};
