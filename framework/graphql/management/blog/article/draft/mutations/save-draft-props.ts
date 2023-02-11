import { gql } from "graphql-request";
import { articleDraftFragment } from "@framework/management/blog/article/draft/fragments";

export const saveArticleDraft = gql`
  ${articleDraftFragment}
  mutation ($articleDraft: ArticleDraftInput!) {
    saveArticleDraft(articleDraft: $articleDraft) {
      updatedDraft {
        ...DraftFragment
      }
    }
  }
`;
