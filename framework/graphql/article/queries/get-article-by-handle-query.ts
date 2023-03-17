import { gql } from "graphql-request";

export const getArticleByHandleQuery = gql`
  fragment NavigationFragment on BlogArticleNavigation {
    next {
      title
      handle
      itIsloop
    }
    prev {
      title
      handle
      itIsloop
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
    renderHtml
    published
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
  query ($handle: String) {
    articleByHandle(handle: $handle) {
      ...BlogArticleFragment
      navigation {
        ...NavigationFragment
      }
    }
  }
`;
