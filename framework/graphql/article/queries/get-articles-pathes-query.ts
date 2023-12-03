import { gql } from "graphql-request";

export const getArticlesPathesQuery = gql`
  query articlesPathes($filename: String) {
    articlesPathes(filename: $filename) {
      nodes {
        handle
      }
    }
  }
`;
