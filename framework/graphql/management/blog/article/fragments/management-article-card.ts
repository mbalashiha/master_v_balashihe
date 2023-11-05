import { gql } from "graphql-request";

const articleCardFragment = gql`
  fragment ArticleCardFragment on ArticleCard {
    id
    title
    handle
    publishedAt
    updatedAt
    score
    fragment
    viewed
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
    secondImage {
      imageId
      imgSrc
      width
      height
      altText
    }
  }
`;
export default articleCardFragment;
