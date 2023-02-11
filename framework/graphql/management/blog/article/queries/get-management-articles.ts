import { gql } from "graphql-request";

export const verifyManagementToken = gql`
  fragment ArticleFragment on BlogArticle {
    articleId
    title
    handle
    text
    textHtml
    textRawDraftContentState
    autoHandleSlug
    published
    orderNumber
    category {
      id
    }
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
