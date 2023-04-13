import { gql } from "graphql-request";
import { articleDraftFragment } from "@framework/management/blog/article/draft/fragments";

export const articleKeyTextDraft = gql`
  ${articleDraftFragment}
  mutation ($articleKeyText: ArticleKeyTextDraftInput!) {
    saveArticleKeyTextDraft(articleKeyText: $articleKeyText) {
      updatedDraft {
        ...DraftFragment
      }
    }
  }
`;
