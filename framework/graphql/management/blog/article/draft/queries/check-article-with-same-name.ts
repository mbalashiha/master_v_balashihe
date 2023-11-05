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
      }
    }
  }
`;
