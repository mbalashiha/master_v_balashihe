import { IncomingHttpHeaders } from "http";
import { BareFetcher, SWRConfiguration, SWRResponse } from "swr";
import { PublicConfiguration } from "swr/_internal";
import { HookDescriptor, SwrHookDescriptor } from "./hook";

export namespace Graphql {
  export interface HookRequestOptions {
    query: string;
    headers?: IncomingHttpHeaders;
  }
  export type RequestOptions<Input> = Input extends
    | void
    | never
    | null
    | undefined
    ? RequestOptionsOptionalVariables<Input>
    : RequestOptionsVariables<Input>;
  export interface RequestOptionsVariables<Input> extends HookRequestOptions {
    variables: Input;
  }
  export interface RequestOptionsOptionalVariables<Input>
    extends HookRequestOptions {
    variables?: Input;
  }
  export type RequestResults<T> = T;
  export interface RequestFunction<Input1 = any, Output1 = any> {
    <Input2 = Input1, Output2 = Output1>(
      options: RequestOptionsVariables<Input2>
    ): Promise<RequestResults<Output2>>;
  }

  export interface RequestContext<Input, Output> {
    input: Input;
    request: RequestFunction<Input, Output>;
    options: HookRequestOptions;
  }
  export interface HookRequest<Input, Output, Data> {
    (context: RequestContext<Input, Output>): Promise<Data>;
  }
  export interface MutationHookContext<Input, Data> {
    request: (input: Input) => Promise<Data>;
  }
  export interface UseDataInitial<InitialInput, Data> {
    variables: InitialInput;
    isReady?: boolean;
    swrOptions?: SWRConfiguration<Data>;
  }
  export interface UseDataContextWithVarables<InitialInput, Input, Data> {
    variables: Input;
    isReady?: boolean;
    swrOptions?: SWRConfiguration<Data>;
    swrKey?: string;
    initial?: UseDataInitial<InitialInput, Data>;
  }
  export interface UseDataContextWithInitial<InitialInput, Input, Data>
    extends UseDataContextWithVarables<InitialInput, Input, Data> {
    variables: Input;
    isReady?: boolean;
    swrOptions?: SWRConfiguration<Data>;
    swrKey?: string;
    initial: UseDataInitial<InitialInput, Data>;
  }

  export type UseDataContext<InitialInput, Input, Data> = Input extends
    | undefined
    | void
    ? Partial<UseDataContextWithVarables<InitialInput, Input, Data>> | void
    : UseDataContextWithVarables<InitialInput, Input, Data>;

  export interface UseData<InitialInput, Input, Data> {
    (
      ctx: Input extends undefined | void
        ? UseDataContext<InitialInput, Input, Data>
        : InitialInput extends undefined | void
        ? UseDataContext<InitialInput, Input, Data>
        : UseDataContextWithInitial<InitialInput, Input, Data>
    ): SWRResponse<
      Data,
      any,
      Partial<PublicConfiguration<Data, any, BareFetcher<Data>>> | undefined
    >;
  }
  export interface ModSWRResponse<Data> extends SWRResponse<Data> {
    isEmpty: boolean;
  }
  export interface MutationHook<H extends HookDescriptor> {
    requestOptions: HookRequestOptions;
    request: HookRequest<H["requestInput"], H["requestOutput"], H["data"]>;
    useHook(
      context: MutationHookContext<H["requestInput"], H["data"]>
    ): () => (input: H["requestInput"]) => Promise<H["data"]>;
  }
  export interface SWRUseHookFunction<InitialInput, Input, Data> {
    (initial?: UseDataInitial<InitialInput, Data>): ModSWRResponse<Data>;
  }
  export interface SWRUseHookFunctionWithInitial<InitialInput, Input, Data> {
    (initial: UseDataInitial<InitialInput, Data>): ModSWRResponse<Data>;
  }
  export interface SWRHook<H extends SwrHookDescriptor> {
    requestOptions: HookRequestOptions;
    swrKey?: string;
    request: HookRequest<H["requestInput"], H["requestOutput"], H["data"]>;
    useHook(context: {
      useData: UseData<H["input"], H["requestInput"], H["data"]>;
    }): H["input"] extends undefined | void
      ? SWRUseHookFunction<H["input"], H["requestInput"], H["data"]>
      : SWRUseHookFunctionWithInitial<H["input"], H["requestInput"], H["data"]>;
  }
}
