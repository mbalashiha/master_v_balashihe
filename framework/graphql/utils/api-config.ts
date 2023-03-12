import { API_HOST, API_URL } from "@framework/const";
import { GraphQLClient } from "graphql-request";
import { AxiosError, default as axios } from "axios";
import { simpleEncrypt } from "@encryption";
import { API } from "@common/types";
import extractGraphQLError from "./extract-graphql-error";
import delay from "delay";

class Config {
  config: API.Config;
  constructor(props?: ConfigConstructorProps) {
    const toLoginPage = props && props.toLoginPage;
    const self = this;
    const graphqlClient = new GraphQLClient(API_URL, {
      mode: "cors", // same-origin, no-cors
      credentials: "include",
    });
    const request: API.Graphql.RequestFunction = async (
      options: API.Graphql.RequestOptions<any>
    ): Promise<API.Graphql.RequestResults<any>> => {
      const { query, variables, headers } = options;
      try {
        const resp = await graphqlClient.request(query, variables, headers);
        return resp;
      } catch (e: any) {
        const apiError = extractGraphQLError(e);
        if (typeof self.config.toLoginPage === "function") {
          if (
            apiError &&
            typeof apiError === "string" &&
            (apiError === "Manager Unauthorized" ||
              apiError === "Client Unauthorized")
          ) {
            self.config.toLoginPage();
            await delay(1000);
          }
        }
        throw apiError && apiError === "string" ? new Error(apiError) : e;
      }
    };
    const axInstance = axios.create({
      baseURL: API_HOST,
      timeout: 18000,
      withCredentials: true,
      // headers: {
      //   "Content-Type": "application/json",
      // Origin: "http://localhost:3000",
      // },
    });
    const restRequest: API.RestApi.RequestFunction = async ({
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
      const needToStringify =
        !(variables instanceof FormData) &&
        headers["Content-Type"] === "application/json" &&
        typeof variables !== "string";
      const body = enc
        ? simpleEncrypt(variables)
        : needToStringify
        ? JSON.stringify(variables)
        : variables;
      if (contentType) {
        headers = { ...headers, "Content-Type": contentType };
      } else if (body instanceof FormData) {
        contentType = "multipart/form-data";
        headers = { ...headers, "Content-Type": contentType };
      }
      if (!method) {
        method =
          body &&
          (body instanceof FormData ||
            typeof body === "string" ||
            typeof body === "object")
            ? "post"
            : "get";
      }
      let responseResult: API.RestApi.RequestResults<any>;
      if (axios) {
        try {
          const resp = await axInstance.request({
            url,
            data: body,
            headers,
            method: method || "post",
            withCredentials: true,
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
        } catch (catchedE: any) {
          const e: AxiosError = catchedE;
          console.error(e.stack || e.message || e);
          const status: number = e.response?.status || e.request.status || 0;
          responseResult = {
            error:
              e.stack ||
              e.cause?.stack ||
              e.message ||
              e.cause?.message ||
              "Axios Error with status: " + status.toString(),
            data: e.response?.data,
            status,
            statusText: e.response?.statusText,
          };
        }
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
    this.config = { request, restRequest, toLoginPage };
  }
  getConfig(props?: ConfigConstructorProps): API.Config {
    const toLoginPage = props && props.toLoginPage;
    if (typeof toLoginPage === "function") {
      this.config.toLoginPage = toLoginPage;
    }
    return this.config;
  }
}
const config = new Config();
interface ConfigConstructorProps {
  toLoginPage: () => void;
}
export default function getConfig(props?: ConfigConstructorProps): API.Config {
  return config.getConfig(props);
}
