declare namespace API {
  declare interface ApiFetcherOptions {
    query: string;
    variables?: any;
    headers?: HeadersInit;
  }
  declare interface Config {
    request<T>(options: ApiFetcherOptions): Promise<T>;
    restApi: AxiosStatic;
  }
}
