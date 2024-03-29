import { AxiosResponse } from "axios";
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
  export type RestRequestOptions<Input> = Input extends
    | void
    | never
    | null
    | undefined
    ? RestRequestOptionsOptionalVariables<Input>
    : RestRequestOptionsVariables<Input>;

  export interface RestRequestOptionsVariables<Input>
    extends HookRequestOptions {
    variables: Input;
  }
  export interface RestRequestOptionsOptionalVariables<Input>
    extends HookRequestOptions {
    variables?: Input;
  }

  export interface RequestResults<T> {
    data: T;
    status: number;
    statusText?: string;
    error?: string;
    response: Response | AxiosResponse;
    ok: boolean;
  }
  export interface RestApiHookContext<Input, Data> {
    restRequest: (input: Input) => Promise<Data>;
  }
  export interface RequestFunction<Input1 = any, Output1 = any> {
    <Input2 = Input1, Output2 = Output1>(
      options: RestRequestOptions<Input2>
    ): Promise<RequestResults<Output2>>;
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
      context: RestApiHookContext<H["requestInput"], H["data"]>
    ): () => (input: H["requestInput"]) => Promise<H["data"]>;
  }
}
