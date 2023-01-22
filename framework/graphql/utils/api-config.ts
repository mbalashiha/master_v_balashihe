import { API_URL } from "@framework/const";
import { GraphQLClient } from "graphql-request";
import axios from "axios";

class Config {
  config: API.Config;
  constructor() {
    const graphqlClient = new GraphQLClient(API_URL, {
      mode: "cors", // same-origin, no-cors
      credentials: "include",
    });
    const request = <Output = any>(
      options: API.ApiFetcherOptions
    ): Promise<Output> => {
      const { query, variables, headers } = options;
      return graphqlClient.request(query, variables, headers);
    };
    this.config = { request, restRequest: axios };
  }
  getConfig(): API.Config {
    return this.config;
  }
}
const config = new Config();

export default function getConfig(): API.Config {
  return config.getConfig();
}
