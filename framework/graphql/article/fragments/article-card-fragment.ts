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
    datePublished
    dateModified
    image {
      imageId
      imgSrc
      width
      height
      altText
    }
  }
`;
export default articleCardFragment;
