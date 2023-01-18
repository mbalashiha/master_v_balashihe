import { API_URL } from "@framework/const";
import { GraphQLClient, gql } from "graphql-request";

const url = API_URL;
const graphqlClient = new GraphQLClient(url, {
  mode: "cors", // same-origin, no-cors
  credentials: "include",
});
type ApiClientOptions = {
  query: string;
  variables?: any;
  headers?: HeadersInit;
};
export const fetchApi = <Output = any>(
  options: ApiClientOptions
): Promise<Output> => {
  const { query, variables, headers } = options;
  return graphqlClient.request(query, variables, headers);
  // .catch((err) => {
  //   const graphqlError =
  //     (err &&
  //       err.response &&
  //       err.response.errors &&
  //       err.response.errors[0] &&
  //       err.response.errors[0].message) ||
  //     err;
  //   console.error("graphQL error:", graphqlError);
  //   throw err;
  // });
};
export default fetchApi;
