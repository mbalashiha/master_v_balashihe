import { gql } from "graphql-request";
import articleCardFragment from "@framework/management/blog/article/fragments/management-article-card";

export const deleteArticle = gql`
  ${articleCardFragment}
  mutation ($id: ID!, $hostOrigin: String!) {
    deleteArticle(id: $id, hostOrigin: $hostOrigin) {
      success
      error
      message
      articleList {
        search
        nodes {
          ...ArticleCardFragment
        }
      }
    }
  }
`;
