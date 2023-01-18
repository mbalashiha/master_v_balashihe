import { gql } from "graphql-request";

export const getAllArticlesQuery = gql`
  fragment BlogArticleFragment on BlogArticle {
    articleId
    title
    handle
    description
    descriptionHtml
    published
    orderNumber
    category {
      id
    }
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
