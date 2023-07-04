import { gql } from "graphql-request";

export const getRecentArticlesQuery = gql`
  query ($search: String) {
    recentArticles(search: $search, limit: 12) {
      nodes {
        title
        handle
        publishedAt
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
