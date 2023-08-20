import { gql } from "graphql-request";

export const getAllArticlesQuery = gql`
  fragment BlogArticleFragment on BlogArticle {
    id
    title
    handle
    text
    textHtml
    published
    orderNumber
    blogCategoryId
    publishedAt
    updatedAt
    publishedAt
    viewed
  }
  query getAllArticlesQuery {
    blogArticles {
      nodes(limit: 250) {
        ...BlogArticleFragment
      }
    }
  }
`;
