import { gql } from "graphql-request";

export const ListArticleFragment = gql`
  fragment ListArticleFragment on BlogArticle {
    id
    title
    handle
    published
    orderNumber
    blogCategoryId
    updatedAt
    publishedAt
    viewed
    description
    datePublished
    dateModified
  }
`;
