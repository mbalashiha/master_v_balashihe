import { gql } from "graphql-request";
import { articleDraftFragment } from "@framework/management/blog/article/draft/fragments";
import { ListArticleFragment } from "@framework/management/blog/queries/list-article-fragment";

export const deleteArticle = gql`
  ${ListArticleFragment}
  mutation ($id: ID!) {
    deleteArticle(id: $id) {
      success
      error
      message
      articleList {
        ...ListArticleFragment
      }
    }
  }
`;
