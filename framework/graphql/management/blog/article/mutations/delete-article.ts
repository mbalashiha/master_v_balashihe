import { gql } from "graphql-request";
import articleCardFragment from "@framework/management/blog/article/fragments/management-article-card";

export const deleteArticle = gql`
  ${articleCardFragment}
  mutation (
    $id: ID!
    $hostOrigin: String!
    $NEXT_PUBLIC_PRODUCTION_SITE_ORIGIN: String!
  ) {
    deleteArticle(
      id: $id
      hostOrigin: $hostOrigin
      NEXT_PUBLIC_PRODUCTION_SITE_ORIGIN: $NEXT_PUBLIC_PRODUCTION_SITE_ORIGIN
    ) {
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
