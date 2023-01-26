declare namespace API {
  declare interface ApiFetcherOptions {
    query: string;
    variables?: any;
    headers?: HeadersInit;
  }
  declare interface RestRequestOptions {
    url: string;
    variables?: any;
    headers?: { [key: string]: string };
    method?: "get" | "post" | "delete" | "head" | "options" | "put" | "patch";
    enc?: boolean;
    contentType?: "application/json" | "multipart/form-data" | "text/plain";
    axios?: boolean;
  }
  declare type ApiRequestResults<T> = {
    data: T;
    status?: number;
    statusText?: string;
    headers?: Headers;
  };
  declare interface Config {
    request: ApiRequest;
    restRequest: RestRequest;
  }
  declare interface Hooks {
    management: {
      auth: {
        useSignIn: any;
        useTokenInfo: any;
      };
    };
  }
  declare type ApiRequest<T = any> = (
    options: ApiFetcherOptions
  ) => Promise<ApiFetcherResults<T>>;

  declare type RestRequest<T = any> = (
    options: RestRequestOptions
  ) => Promise<ApiFetcherResults<T>>;

  declare interface ApiProviderContext {
    hooks: Hooks;
    request: ApiRequest;
    restRequest: RestRequest;
  }
  declare interface GraphqlRequestContext {
    input: any;
    request: ApiRequest;
    options: ApiFetcherOptions;
  }
  declare interface FetchDataContext {
    request: ApiRequest;
  }
  declare interface MutationHookContext {
    request: ApiRequest;
  }
  declare interface RestApiHookContext {
    restRequest: RestRequest;
  }
  declare interface FetchDataHook {
    requestOptions: ApiFetcherOptions;
    request: (context: GraphqlRequestContext) => any;
    useHook(context: FetchDataHookContext): (input: any) => any;
  }
  declare interface MutationHook {
    requestOptions: ApiFetcherOptions;
    request: (context: GraphqlRequestContext) => any;
    useHook(context: MutationHookContext): (input: any) => any;
  }
  declare interface RestApiRequestContext {
    input: any;
    restRequest: RestRequest;
    options: RestRequestOptions;
  }
  declare interface RestApiHook {
    options: RestRequestOptions;
    restRequest: (context: RestApiRequestContext) => any;
    useHook(context: RestApiHookContext): (input: any) => any;
  }
}
