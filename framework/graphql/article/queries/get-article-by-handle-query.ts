import { gql } from "graphql-request";

export const getArticleByHandleQuery = gql`
  fragment BlogArticleFragment on BlogArticle {
    id
    title
    handle
    text
    textHtml
    published
    orderNumber
    blogCategoryId
    createdAt
    updatedAt
    publishedAt
  }
  query ($handle: String) {
    articleByHandle(handle: $handle) {
      ...BlogArticleFragment
    }
  }
`;
