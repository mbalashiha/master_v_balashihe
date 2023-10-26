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
    h2
    keyTextHtml
    autoHandleSlug
    unPublished
    notSearchable
    notInList
    orderNumber
    blogCategoryId
    templateId
    viewed
    createdAt
    updatedAt
    publishedAt
    ogDates {
      modified_time
      published_time
    }
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
    secondImageId
    secondImage {
      imageId
      imgSrc
      width
      height
      altText
    }
  }
`;
