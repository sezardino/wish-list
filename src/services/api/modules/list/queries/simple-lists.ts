import { gql } from "graphql-request";

export const simpleListsQuery = gql`
  query SimpleLists {
    lists {
      id
      name
    }
  }
`;
