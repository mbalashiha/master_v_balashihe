import { gql } from "graphql-request";
import { articleDraftFragment } from "@framework/management/blog/draft/fragments";

export const saveArticleTextDraft = gql`
  ${articleDraftFragment}
  mutation ($articleTextDraft: ArticleTextDraftInput!) {
    saveArticleTextDraft(articleTextDraft: $articleTextDraft) {
      updatedDraft {
        ...DraftFragment
      }
    }
  }
`;
