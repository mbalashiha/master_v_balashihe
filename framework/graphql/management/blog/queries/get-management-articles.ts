import { gql } from "graphql-request";

export const verifyManagementToken = gql`
  fragment ArticleFragment on BlogArticle {
    articleId
    title
    handle
    description
    descriptionHtml
    published
    orderNumber
    createdAt
    updatedAt
    publishedAt
  }
  query managementGetArticles {
    managementGetArticles {
      ...ArticleFragment
    }
  }
`;
