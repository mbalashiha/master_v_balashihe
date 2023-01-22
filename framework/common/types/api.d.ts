declare namespace API {
  declare interface ApiFetcherOptions {
    query: string;
    variables?: any;
    headers?: HeadersInit;
  }
  declare interface Config {
    request: Request;
    restRequest: AxiosStatic;
  }
  declare interface Hooks {
    management: {
      auth: {
        useSignIn: any;
      };
    };
  }
  declare type Request<T = any> = (options: ApiFetcherOptions) => Promise<T>;
  declare interface ApiProviderContext {
    hooks: Hooks;
    request: Request;
  }
}
