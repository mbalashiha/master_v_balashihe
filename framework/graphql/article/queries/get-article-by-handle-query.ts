import { gql } from "graphql-request";

export const getArticleByHandleQuery = gql`
  fragment NavigationFragment on BlogArticleNavigation {
    prev {
      title
      handle
    }
    next {
      title
      handle
    }
    nearestSiblings {
      title
      handle
    }
  }
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
      navigation {
        ...NavigationFragment
      }
    }
  }
`;
