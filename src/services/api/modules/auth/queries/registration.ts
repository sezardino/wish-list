import { gql } from "graphql-request";

export const registrationQuery = gql`
  mutation Registration($login: String!, $password: String!) {
    registration(login: $login, password: $password)
  }
`;
