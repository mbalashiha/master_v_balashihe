import { gql } from "graphql-request";

const articleCardFragment = gql`
  fragment ArticleCardFragment on ArticleCard {
    id
    title
    handle
    absURL
    displayingPageHandle
    publishedAt
    updatedAt
    score
    fragment
    description
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
