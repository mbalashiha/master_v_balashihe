import { gql } from "graphql-request";
import { articleDraftFragment } from "@framework/management/blog/article/draft/fragments";

export const getArticleDraft = gql`
  ${articleDraftFragment}
  query ($articleId: ID) {
    articleDraft(articleId: $articleId) {
      ...DraftFragment
    }
  }
`;
