import { gql } from "graphql-request";

export const getRecentArticlesQuery = gql`
  query ($search: String) {
    articlesCards(search: $search, limit: 12) {
      nodes {
        title
        handle
        createdAt
        score
        fragment
        image {
          imageId
          imgSrc
          width
          height
          altText
        }
      }
    }
  }
`;
