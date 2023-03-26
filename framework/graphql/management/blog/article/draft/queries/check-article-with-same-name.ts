import { gql } from "graphql-request";

export const managementCheckArticleQuery = gql`
  query ($title: String, $handle: String) {
    managementCheckArticle(title: $title, handle: $handle) {
      id
      title
      handle
      absURL
      text
      textHtml
      textRawDraftContentState
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
  }
`;
