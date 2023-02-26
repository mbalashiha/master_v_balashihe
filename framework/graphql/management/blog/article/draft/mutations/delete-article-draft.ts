import { gql } from "graphql-request";
import { articleDraftFragment } from "@framework/management/blog/article/draft/fragments";

export const deleteArticleDraft = gql`
  ${articleDraftFragment}
  mutation ($id: ID!) {
    deleteArticleDraft(id: $id) {
      success
      error
      message
      updatedDraft {
        ...DraftFragment
      }
    }
  }
`;
