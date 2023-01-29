import { API_ORIGIN, API_URL } from "@framework/const";
import { GraphQLClient } from "graphql-request";
import { default as axios } from "axios";
import { simpleEncrypt } from "@encryption";
import { API } from "@common/types";

class Config {
  config: API.Config;
  constructor() {
    const graphqlClient = new GraphQLClient(API_URL, {
      mode: "cors", // same-origin, no-cors
      credentials: "include",
    });
    const request: API.Graphql.RequestFunction<any, any> = async (
      options: API.Graphql.RequestOptions<any>
    ): Promise<API.Graphql.RequestResults<any>> => {
      const { query, variables, headers } = options;
      const resp = await graphqlClient.request(
        query,
        variables,
        headers
      );
      return resp;
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
    const restRequest: API.RestApi.RequestFunction<any, any> = async({
      url,
      variables,
      headers,
      method,
      enc,
      contentType,
      axios,
    }: API.RestApi.RestRequestOptions<any>): Promise<
      API.RestApi.RequestResults<any>
    > => {
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
      if (!method) {
        method =
          body && (typeof body === "string" || Object.keys(body).length)
            ? "post"
            : "get";
      }
      let responseResult: API.RestApi.RequestResults<any>;
      if (axios) {
        const resp = await axInstance.request({
          url,
          data: body,
          headers,
          method: method || "post",
        });
        if (typeof resp.data === "string") {
          try {
            resp.data = JSON.parse(resp.data);
          } catch (e: any) {}
        }
        const { data, status, statusText, headers: responseHeaders } = resp;
        responseResult = {
          data,
          status,
          statusText,
        };
      } else {
        const resp = await fetch(url, {
          mode: "cors", // same-origin, no-cors
          credentials: "include",
          method: method || "post",
          body,
          headers,
        });
        let data;
        const text = await resp.text();
        try {
          data = JSON.parse(text);
        } catch (e: any) {
          data = text;
        }
        const { status, statusText, headers: responseHeaders } = resp;
        responseResult = {
          data,
          status,
          statusText,
        };
      }
      return responseResult;
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
