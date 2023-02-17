import { gql } from "graphql-request";
import { articleDraftFragment } from "@framework/management/blog/article/draft/fragments";

export const saveArticle = gql`
${articleDraftFragment}
  mutation ($article: ArticleInput!) {
    saveArticle(article: $article) {
      success
      error
      message
      articleId
      articleDraft {
        ...DraftFragment
      }
    }
  }
`;
