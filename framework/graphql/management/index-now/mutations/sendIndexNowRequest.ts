import { gql } from "graphql-request";

export const sendIndexNowRequest = gql`
  mutation ($apiUrl: String!, $nodes: [ProductionUuidIndexNowInput]!) {
    sendIndexNowRequest(apiUrl: $apiUrl, nodes: $nodes) {
      apiUrl
      ok
      status
      statusText
      urlList
      siteHost
      message
      error
      code
    }
  }
`;
