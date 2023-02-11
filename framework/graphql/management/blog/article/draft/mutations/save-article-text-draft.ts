import { gql } from "graphql-request";
import { articleDraftFragment } from "@framework/management/blog/article/draft/fragments";

export const articleTextDraft = gql`
  ${articleDraftFragment}
  mutation ($articleTextDraft: ArticleTextDraftInput!) {
    saveArticleTextDraft(articleTextDraft: $articleTextDraft) {
      updatedDraft {
        ...DraftFragment
      }
    }
  }
`;
