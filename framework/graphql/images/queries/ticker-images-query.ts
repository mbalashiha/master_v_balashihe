import { gql } from "graphql-request";

export const getTickerImagesQuery = gql`
  query getTickerImagesQuery {
    getTickerImages {
      imageId
      imgSrc
      width
      height
      altText
      title
    }
  }
`;
