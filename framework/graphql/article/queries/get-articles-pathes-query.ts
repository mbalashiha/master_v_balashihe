import { gql } from "graphql-request";

export const getArticlesPathesQuery = gql`
  query articlesPathes {
    articlesPathes {
      nodes {
        handle
      }
    }
  }
`;
