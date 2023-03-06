import { gql } from "graphql-request";

export const deleteArticle = gql`
  mutation ($id: ID!) {
    deleteArticle(id: $id) {
      success
      error
      message
      articleList {
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
  }
`;
