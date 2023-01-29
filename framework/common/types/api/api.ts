import type { Graphql } from "./graphql";
import type { RestApi } from "./restApi";

export interface Config {
  request: Graphql.RequestFunction<any, any>;
  restRequest: RestApi.RequestFunction<any, any>;
}
export type Hook =
  | Graphql.MutationHook<any>
  | Graphql.SWRHook<any>
  | RestApi.RestApiHook<any>;

export interface Hooks {
  management: {
    auth: {
      useSignIn: RestApi.RestApiHook<any>;
      useTokenInfo: any;
    };
  };
}
export interface ApiProviderContext {
  hooks: Hooks;
  request: Graphql.RequestFunction<any, any>;
  restRequest: RestApi.RequestFunction<any, any>;
}
