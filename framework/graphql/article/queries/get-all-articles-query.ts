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
    createdAt
    updatedAt
    publishedAt
  }
  query getAllArticlesQuery {
    blogArticles {
      nodes(limit: 250) {
        ...BlogArticleFragment
      }
    }
  }
`;
