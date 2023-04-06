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
    createdAt
    updatedAt
    publishedAt
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
