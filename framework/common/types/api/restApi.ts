import { HookDescriptor } from "./hook";

export namespace RestApi {
  export interface HookRequestOptions {
    url: string;
    headers?: { [key: string]: string };
    method?: "get" | "post" | "delete" | "head" | "options" | "put" | "patch";
    enc?: boolean;
    contentType?: "application/json" | "multipart/form-data" | "text/plain";
    axios?: boolean;
  }
  export interface RestRequestOptions<Input> extends HookRequestOptions {
    variables: Input;
  }
  export interface RequestResults<T> {
    data: T;
    status?: number;
    statusText?: string;
  };
  export interface RestApiHookContext<Input, Output> {
    restRequest: (input: Input) => Promise<Output>;
  }
  export interface RequestFunction<Input, Output> {
    (options: RestRequestOptions<Input>): Promise<RequestResults<Output>>;
  }
  export interface RestApiRequestContext<Input, Output> {
    input: Input;
    restRequest: RequestFunction<Input, Output>;
    options: HookRequestOptions;
  }
  export interface HookRequest<Input, Output, Data> {
    (context: RestApiRequestContext<Input, Output>): Promise<Data>;
  }
  export interface RestApiHook<H extends HookDescriptor> {
    options: HookRequestOptions;
    restRequest: HookRequest<H["requestInput"], H["requestOutput"], H["data"]>;
    useHook(
      context: RestApiHookContext<H["requestInput"], H["requestOutput"]>
    ): () => (input: H["requestInput"]) => Promise<H["data"]>;
  }
}
