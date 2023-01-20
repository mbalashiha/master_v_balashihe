import { API_URL } from "@framework/const";
import { GraphQLClient } from "graphql-request";

class Config {
  request: <Output = any>(options: API.ApiFetcherOptions) => Promise<Output>;
  constructor() {
    const graphqlClient = new GraphQLClient(API_URL, {
      mode: "cors", // same-origin, no-cors
      credentials: "include",
    });
    this.request = <Output = any>(
      options: API.ApiFetcherOptions
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
  }
}
export default function getConfig(): API.Config {
  return new Config();
}
