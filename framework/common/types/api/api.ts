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

export interface SiteHooks {
  site: {
    contact: {
      useSendEmail: RestApi.RestApiHook<any>;
      useSendRequest: RestApi.RestApiHook<any>;
    };
    useCountViews: RestApi.RestApiHook<any>;
  };
}
export interface ManagementHooks {
  management: {
    auth: {
      useSignIn: RestApi.RestApiHook<any>;
      useSignOut: RestApi.RestApiHook<any>;
      useTokenInfo: Graphql.SWRHook<any>;
      useTokenOneTime: Graphql.SWRHook<any>;
    };
    image: {
      useImageUpload: RestApi.RestApiHook<any>;
    };
    blog: {
      useArticleList: Graphql.SWRHook<any>;
      useArticleSearch: Graphql.MutationHook<any>;
      article: {
        useSaveArticle: Graphql.MutationHook<any>;
        useDeleteArticle: Graphql.MutationHook<any>;
        useTemplateList: Graphql.SWRHook<any>;
        draft: {
          useArticleDraft: Graphql.SWRHook<any>;
          useSaveArticleText: Graphql.MutationHook<any>;
          useSaveArticleKeyText: Graphql.MutationHook<any>;
          useSaveDraftProps: Graphql.MutationHook<any>;
          useDeleteDraft: Graphql.MutationHook<any>;
          useCheckArticle: Graphql.MutationHook<any>;
        };
      };
    };
  };
}
export interface ApiProviderContext<Hooks> {
  hooks: Hooks;
  request: Graphql.RequestFunction;
  restRequest: RestApi.RequestFunction;
}
