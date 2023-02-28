import { gql } from "graphql-request";

export const getArticlesCardsQuery = gql`
  query getArticlesCardsQuery {
    articlesCards {
      nodes {
        title
        handle
        createdAt
      }
    }
  }
`;
