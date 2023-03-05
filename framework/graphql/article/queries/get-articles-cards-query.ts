import { gql } from "graphql-request";

export const getArticlesCardsQuery = gql`
  query ($search: String) {
    articlesCards(search: $search) {
      nodes {
        title
        handle
        createdAt
        score
        fragment
      }
    }
  }
`;
