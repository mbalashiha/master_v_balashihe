import { gql } from "graphql-request";

export const getNextjsRevalidateUrlsMutation = gql`
  mutation ($uuids: [String]!, $secret: String!) {
    getNextjsRevalidateUrls(uuids: $uuids, secret: $secret) {
      urls
    }
  }
`;
