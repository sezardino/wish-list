import { gql } from "graphql-request";

export const tagsAndQueriesQuery = gql`
  query TagsAndCategories($tagType: TagCategory, $categoryType: TagCategory) {
    tags(type: $tagType)
    categories(type: $categoryType)
  }
`;
