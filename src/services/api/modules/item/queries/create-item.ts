import { gql } from "graphql-request";

export const createItemQuery = gql`
  mutation CreateItem(
    $name: String!
    $description: String
    $averagePrice: Float!
    $category: String
    $tags: [String]
    $listId: ID!
    $links: [LinkInput!]
  ) {
    createItem(
      name: $name
      description: $description
      averagePrice: $averagePrice
      category: $category
      tags: $tags
      listId: $listId
      links: $links
    ) {
      id
    }
  }
`;
