import { gql } from "graphql-request";

export const getArticleByHandleQuery = gql`
  fragment ImageFragment on Image {
    imageId
    imgSrc
    width
    height
    altText
    title
  }
  fragment NavigationItemFragment on NavigationItem {
    title
    handle
    itIsloop
    image {
      ...ImageFragment
    }
  }
  fragment NavigationFragment on BlogArticleNavigation {
    next {
      ...NavigationItemFragment
    }
    prev {
      ...NavigationItemFragment
    }
    nearestSiblings {
      ...NavigationItemFragment
    }
  }
  fragment BlogArticleFragment on BlogArticle {
    id
    title
    handle
    absURL
    displayingPageHandle
    renderHtml
    text
    keyTextHtml
    unPublished
    notSearchable
    notInList
    orderNumber
    blogCategoryId
    createdAt
    updatedAt
    publishedAt
    templateId
    description
    datePublished
    dateModified
    viewed
    ogDates {
      modified_time
      published_time
    }
    image {
      ...ImageFragment
    }
    randomImage {
      ...ImageFragment
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
