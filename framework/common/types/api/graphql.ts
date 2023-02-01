import { SWRConfiguration, SWRResponse } from "swr";
import { HookDescriptor } from "./hook";

export namespace Graphql {
  export interface HookRequestOptions {
    query: string;
    headers?: HeadersInit;
  }
  export interface RequestOptions<Input> extends HookRequestOptions {
    variables: Input;
  }
  export type RequestResults<T> = T;
  export interface RequestFunction<Input, Output> {
    (options: RequestOptions<Input>): Promise<RequestResults<Output>>;
  }
  export interface RequestContext<Input, Output> {
    input: Input;
    request: RequestFunction<Input, Output>;
    options: HookRequestOptions;
  }
  export interface HookRequest<Input, Output, Data> {
    (context: RequestContext<Input, Output>): Promise<Data>;
  }
  export interface MutationHookContext<Input, Output> {
    request: (input: Input) => Promise<Output>;
  }
  export interface UseDataContext<Input, Data> {
    variables?: Input;
    swrOptions?: SWRConfiguration<Data>;
    initial?: {
      variables?: Input;
      options?: SWRConfiguration<Data>;
    };
  }
  export interface UseData<Input, Data> {
    (ctx: UseDataContext<Input, Data>): SWRResponse<Data>;
  }

  export interface ModSWRResponse<Data> extends SWRResponse<Data> {
    isEmpty: boolean;
  }
  export interface MutationHook<H extends HookDescriptor> {
    requestOptions: HookRequestOptions;
    request: HookRequest<H["requestInput"], H["requestOutput"], H["data"]>;
    useHook(
      context: MutationHookContext<H["requestInput"], H["requestOutput"]>
    ): () => (input: H["requestInput"]) => Promise<H["data"]>;
  }

  export interface SWRHook<H extends HookDescriptor> {
    requestOptions: HookRequestOptions;
    request: HookRequest<H["requestInput"], H["requestOutput"], H["data"]>;
    useHook(context: {
      useData: UseData<H["requestInput"], H["data"]>;
    }): (
      initial?: UseDataContext<H["requestInput"], H["data"]>["initial"]
    ) => ModSWRResponse<H["data"]>;
  }
  export interface FetchedSWRResponse<Data> extends SWRResponse<Data> {
    fetched: boolean;
  }
  export interface TryOneResponse<Data> extends FetchedSWRResponse<Data> {
    isEmpty: boolean;
  }
  export interface UseOneTime<Input, Data> {
    (ctx: UseDataContext<Input, Data>): FetchedSWRResponse<Data>;
  }
  export interface OneTimeHook<H extends HookDescriptor> {
    requestOptions: HookRequestOptions;
    request: HookRequest<H["requestInput"], H["requestOutput"], H["data"]>;
    useHook(context: {
      useOneTime: UseOneTime<H["requestInput"], H["data"]>;
    }): (
      initial?: UseDataContext<H["requestInput"], H["data"]>["initial"]
    ) => TryOneResponse<H["data"]>;
  }
}
