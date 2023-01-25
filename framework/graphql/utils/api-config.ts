import { API_ORIGIN, API_URL } from "@framework/const";
import { GraphQLClient } from "graphql-request";
import { default as axios } from "axios";
import { simpleEncrypt } from "@encryption";

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
    const axInstance = axios.create({
      baseURL: API_ORIGIN,
      timeout: 18000,
      withCredentials: true,
      // headers: {
      //   "Content-Type": "application/json",
      // Origin: "http://localhost:3000",
      // },
    });
    const restRequest: API.RestRequest = async ({
      url,
      variables,
      headers,
      method,
      enc,
      contentType,
      axios,
    }) => {
      headers = { ...headers, "Content-Type": "application/json" };
      if (enc) {
        headers = { ...headers, "Content-Type": "text/plain" };
      }
      if (contentType) {
        headers = { ...headers, "Content-Type": contentType };
      }
      const needToStringify =
        variables &&
        (headers["Content-Type"] === "application/json" ||
          headers["Content-Type"] === "text/plain") &&
        typeof variables !== "string";
      const body = enc
        ? simpleEncrypt(variables)
        : needToStringify
        ? JSON.stringify(variables)
        : variables;
      if (axios) {
        return axInstance.request({
          url,
          data: body,
          headers,
          method: method || "post",
        });
      } else {
        const resp = await fetch(url, {
          mode: "cors", // same-origin, no-cors
          credentials: "include",
          method: method || "post",
          body,
          headers,
        });
        const text = await resp.text();
        try {
          return JSON.parse(text);
        } catch (e: any) {
          console.error(e.stack || e.message || e);
          return text;
        }
      }
    };
    this.config = { request, restRequest };
  }
  getConfig(): API.Config {
    return this.config;
  }
}
const config = new Config();

export default function getConfig(): API.Config {
  return config.getConfig();
}
