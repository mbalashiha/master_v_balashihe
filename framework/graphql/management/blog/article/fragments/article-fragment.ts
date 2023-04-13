import { gql } from "graphql-request";

const articleFragment = gql`
  fragment ArticleFragment on BlogArticle {
    id
    title
    handle
    absURL
    text
    textHtml
    textRawDraftContentState
    keyTextHtml
    autoHandleSlug
    unPublished
    notSearchable
    notInList
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
`;
export default articleFragment;
