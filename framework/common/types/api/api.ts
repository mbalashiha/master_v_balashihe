import type { Graphql } from "./graphql";
import type { RestApi } from "./restApi";

export interface Config {
  request: Graphql.RequestFunction<any, any>;
  restRequest: RestApi.RequestFunction<any, any>;
  toLoginPage: (() => void) | undefined;
}
export type Hook =
  | Graphql.MutationHook<any>
  | Graphql.SWRHook<any>
  | RestApi.RestApiHook<any>
  | Graphql.OneTimeHook<any>;

export interface Hooks {
  management: {
    auth: {
      useSignIn: RestApi.RestApiHook<any>;
      useSignOut: RestApi.RestApiHook<any>;
      useTokenInfo: Graphql.SWRHook<any>;
      useTokenOneTime: Graphql.OneTimeHook<any>;
    };
    blog: {
      article: {
        useSaveArticle: Graphql.MutationHook<any>;
        draft: {
          useArticleDraft: Graphql.OneTimeHook<any>;
          useSaveArticleText: Graphql.MutationHook<any>;
          useSaveDraftProps: Graphql.MutationHook<any>;
        };
      };
    };
  };
}
export interface ApiProviderContext {
  hooks: Hooks;
  request: Graphql.RequestFunction<any, any>;
  restRequest: RestApi.RequestFunction<any, any>;
}
