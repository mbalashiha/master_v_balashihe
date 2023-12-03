import { gql } from "graphql-request";

const articleCardFragment = gql`
  fragment ArticleCardFragment on ArticleCard {
    id
    title
    handle
    absURL
    publishedAt
    updatedAt
    score
    fragment
    description
    modifiedDate
    publishedDate
    datePublishedISO
    dateModifiedISO
    image {
      imageId
      imgSrc
      width
      height
      altText
      title
    }
  }
`;
export default articleCardFragment;
