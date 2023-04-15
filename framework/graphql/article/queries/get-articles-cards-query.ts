import { gql } from "graphql-request";

export const getArticlesCardsQuery = gql`
  query ($search: String) {
    articlesCards(search: $search) {
      nodes {
        title
        handle
        absURL
        displayingPageHandle
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
