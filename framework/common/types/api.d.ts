declare namespace API {
  declare interface Config {
    request: Graphql.RequestFunction;
    restRequest: Rest.RequestFunction;
  }
  declare interface Hooks {
    management: {
      auth: {
        useSignIn: any;
        useTokenInfo: any;
      };
    };
  }
  declare interface HookDescriptor {
    requestInput: any;
    requestOutput: any;
    data: any;
  }
  declare interface ApiProviderContext {
    hooks: Hooks;
    request: Graphql.RequestFunction;
    restRequest: Rest.RequestFunction;
  }

  declare namespace Graphql {
    declare interface HookRequestOptions {
      query: string;
      headers?: HeadersInit;
    }
    declare type RequestResults<T> = T;
    declare interface RequestFunction<Input, Output> {
      (options: RequestFunctionOptions<Input>): Promise<RequestResults<Output>>;
    }
    declare interface RequestContext<Input, Output> {
      input: Input;
      request: RequestFunction<Input, Output>;
      options: HookRequestOptions;
    }
    declare interface HookRequest<Input, Output> {
      (context: RequestContext<Input, Output>): Promise<Output>;
    }
    declare interface MutationHookContext<Input, Output> {
      request: (input: Input) => Promise<Output>;
    }    
    declare interface RequestOptions<Input> extends HookRequestOptions {
      variables: Input;
    }
    declare interface MutationHook<H extends HookDescriptor> {
      requestOptions: HookRequestOptions;
      request: HookRequest<H["requestInput"], H["requestOutput"]>;
      useHook(
        context: MutationHookContext<H["requestInput"], H["requestOutput"]>
      ): (input: H["requestInput"]) => Promise<H["data"]>;
    }
  }
  declare namespace Rest {
    declare interface HookRequestOptions {
      url: string;
      headers?: { [key: string]: string };
      method?: "get" | "post" | "delete" | "head" | "options" | "put" | "patch";
      enc?: boolean;
      contentType?: "application/json" | "multipart/form-data" | "text/plain";
      axios?: boolean;
    }
    declare type RequestResults<T> = {
      data: T;
      status?: number;
      statusText?: string;
    };
    declare interface RestApiHookContext<Input, Output> {
      restRequest: (input: Input) => Promise<Output>;
    }
    declare interface RequestFunction<Input, Output> {
      (options: RestRequestOptions<Input>): Promise<RequestResults<Output>>;
    }
    declare interface RestApiRequestContext<Input, Output> {
      input: Input;
      restRequest: RequestFunction<Input, Output>;
      options: HookRequestOptions;
    }
    declare interface HookRequest<Input, Output> {
      (context: RestApiRequestContext<Input, Output>): Promise<Output>;
    }
    declare interface RequestOptions<Input> extends HookRequestOptions {
      variables: Input;
    }
    declare interface RestApiHook<H extends HookDescriptor> {
      options: HookRequestOptions;
      restRequest: HookRequest<H["requestInput"], H["requestOutput"]>;
      useHook(
        context: RestApiHookContext<H["requestInput"], H["requestOutput"]>
      ): (input: H["requestInput"]) => Promise<H["data"]>;
    }
  }
}
