import { gql } from "graphql-request";
import { articleDraftFragment } from "@framework/management/blog/article/draft/fragments";

export const getArticleEditQuery = gql`
  ${articleDraftFragment}
  query ($articleId: ID) {
    articleDraft(articleId: $articleId) {
      ...DraftFragment
    }
  }
`;
