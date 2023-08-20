import { gql } from "graphql-request";

export const getArticleByAbsUrlQuery = gql`
  fragment BlogArticleFragment on BlogArticle {
    id
    title
    handle
    absURL
    displayingPageHandle
    renderHtml
    unPublished
    notSearchable
    notInList
    orderNumber
    blogCategoryId
    updatedAt
    publishedAt
    templateId
    viewed
    image {
      imageId
      imgSrc
      width
      height
      altText
    }
  }
  query ($absURL: String) {
    articleByAbsUrl(absURL: $absURL) {
      ...BlogArticleFragment
    }
  }
`;
