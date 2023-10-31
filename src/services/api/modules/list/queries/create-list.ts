import { gql } from "graphql-request";

export const createListQuery = gql`
  mutation CreateList(
    $name: String!
    $icon: String
    $category: String
    $tags: [String]
    $description: String
  ) {
    createList(
      name: $name
      icon: $icon
      category: $category
      tags: $tags
      description: $description
    ) {
      id
      name
      category
      tags
      description
      icon
      privacy
      averagePrice
      ownerId
      hash
      items {
        id
      }
      createdAt
      updatedAt
    }
  }
`;
