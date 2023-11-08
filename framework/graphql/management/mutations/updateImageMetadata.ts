import { gql } from "graphql-request";

export const updateImageMetadata = gql`
  mutation ($input: ImageArrayInput!) {
    updateImageMetadata(input: $input) {
      images {
        imageId
        imgSrc
        width
        height
        altText
        title
        createdAt
        updatedAt
      }
    }
  }
`;
