import { gql } from "graphql-request";
import articleFragment from "@framework/management/blog/article/fragments/article-fragment";

export const articleDraftFragment = gql`
  ${articleFragment}
  fragment DraftFragment on ArticleDraft {
    id
    title
    handle
    text
    textHtml
    textRawDraftContentState
    autoHandleSlug
    published
    orderNumber
    blogCategoryId
    createdAt
    updatedAt
    publishedAt
    existingArticle {
      ...ArticleFragment
    }
  }
`;
