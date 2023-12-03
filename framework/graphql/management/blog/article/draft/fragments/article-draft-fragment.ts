import { gql } from "graphql-request";
import articleFragment from "@framework/article/fragments/article-fragment";

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
    description
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
      title
    }
    secondImageId
    secondImage {
      imageId
      imgSrc
      width
      height
      altText
      title
    }
  }
`;
