import type { Graphql } from "./graphql";
import type { RestApi } from "./restApi";

export interface Config {
  request: Graphql.RequestFunction;
  restRequest: RestApi.RequestFunction;
  toLoginPage: (() => void) | undefined;
}
export type Hook =
  | Graphql.MutationHook<any>
  | Graphql.SWRHook<any>
  | RestApi.RestApiHook<any>;

export interface Hooks {
  management: {
    auth: {
      useSignIn: RestApi.RestApiHook<any>;
      useSignOut: RestApi.RestApiHook<any>;
      useTokenInfo: Graphql.SWRHook<any>;
      useTokenOneTime: Graphql.SWRHook<any>;
    };
    blog: {
      useArticleList: Graphql.SWRHook<any>;
      useArticleSearch: Graphql.MutationHook<any>;
      article: {
        useSaveArticle: Graphql.MutationHook<any>;
        useDeleteArticle: Graphql.MutationHook<any>;
        draft: {
          useArticleDraft: Graphql.SWRHook<any>;
          useSaveArticleText: Graphql.MutationHook<any>;
          useSaveDraftProps: Graphql.MutationHook<any>;
          useDeleteDraft: Graphql.MutationHook<any>;
        };
      };
    };
  };
}
export interface ApiProviderContext {
  hooks: Hooks;
  request: Graphql.RequestFunction;
  restRequest: RestApi.RequestFunction;
}
