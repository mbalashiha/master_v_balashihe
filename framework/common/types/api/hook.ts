export interface HookDescriptor<Input = any, ReqOutput = any, Data = any> {
  requestInput: Input;
  requestOutput: ReqOutput;
  data: Data;
}
export interface SwrHookDescriptor<
  InitialInput = any,
  Input extends InitialInput = any,
  ReqOutput = any,
  Data = any
> extends HookDescriptor<Input, ReqOutput, Data> {
  input: InitialInput;
  requestInput: Input;
  requestOutput: ReqOutput;
  data: Data;
}
