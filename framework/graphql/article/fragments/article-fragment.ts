import { gql } from "graphql-request";

const articleFragment = gql`
  fragment ArticleFragment on BlogArticle {
    id
    title
    handle
    absURL
    renderHtml
    text
    textHtml
    h2
    keyTextHtml
    unPublished
    notSearchable
    notInList
    orderNumber
    blogCategoryId
    createdAt
    updatedAt
    publishedAt
    description
    datePublished
    dateModified
    ogDates {
      modified_time
      published_time
    }
    image {
      imageId
      imgSrc
      width
      height
      altText
      title
    }
    secondImage {
      imageId
      imgSrc
      width
      height
      altText
      title
    }
  }
`;
export default articleFragment;
