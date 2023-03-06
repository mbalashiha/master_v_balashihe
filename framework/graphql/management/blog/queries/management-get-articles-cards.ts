import { gql } from "graphql-request";

export const managementArticlesCards = gql`
  query ($search: String) {
    managementArticlesCards(search: $search) {
      search
      nodes {
        id
        title
        handle
        createdAt
        score
        fragment
      }
    }
  }
`;
