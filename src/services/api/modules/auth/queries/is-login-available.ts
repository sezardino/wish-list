import { gql } from "graphql-request";

export const isLoginAvailableQuery = gql`
  query IsLoginAvailable($login: String!) {
    isLoginAvailable(login: $login)
  }
`;
