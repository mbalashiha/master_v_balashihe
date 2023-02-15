import { gql } from "graphql-request";

export const ListArticleFragment = gql`
  fragment ListArticleFragment on BlogArticle {
    id
    title
    handle
    autoHandleSlug
    published
    orderNumber
    blogCategoryId
    createdAt
    updatedAt
    publishedAt
  }
`;