import { gql } from "graphql-request";
import articleFragment from "@framework/management/blog/article/fragments/article-fragment";

export const articleDraftFragment = gql`
  ${articleFragment}
  fragment DraftFragment on ArticleDraft {
    id
    title
    handle
    absURL
    text
    textHtml
    textRawDraftContentState
    keyTextHtml
    autoHandleSlug
    unPublished
    notSearchable
    notInList
    orderNumber
    blogCategoryId
    createdAt
    updatedAt
    publishedAt
    existingArticleId
    existingArticle {
      ...ArticleFragment
    }
    imageId
    image {
      imageId
      imgSrc
      width
      height
      altText
    }
  }
`;
