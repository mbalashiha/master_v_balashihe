import { gql } from "graphql-request";

const articleCardFragment = gql`
  fragment ArticleCardFragment on ArticleCard {
    id
    title
    handle
    publishedAt
    score
    fragment
    viewed
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
