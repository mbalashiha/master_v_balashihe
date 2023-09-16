import { API_HOST, API_URL } from "@framework/const";
import { GraphQLClient, RequestOptions, Variables } from "graphql-request";
import { AxiosError, default as axios } from "axios";
import { simpleEncrypt } from "@encryption";
import { API } from "@common/types";
import extractGraphQLError from "./extract-graphql-error";
import delay from "delay";
import util from "util";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next/types";
import { IncomingHttpHeaders } from "http";
import getConfig from "./api-config";
import { Graphql } from "@common/types/api/graphql";

export class ServerSideApi {
  headers: IncomingHttpHeaders;
  config: API.Config;
  constructor(ctx: GetServerSidePropsContext) {
    this.headers = ctx.req.headers;
    this.config = getConfig();
  }
  request<Input extends Variables = Variables, Props = any>(
    options: API.Graphql.RequestOptions<Input>
  ): Promise<Props> {
    let { query, variables, headers } = options;
    if (this.headers.cookie) {
      headers = { cookie: this.headers.cookie, ...headers };
    }
    return this.config.request({ query, variables, headers });
  }
}
export default ServerSideApi;
