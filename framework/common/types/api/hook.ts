export interface HookDescriptor<Input = any, ReqOutput = any, Data = any> {
  requestInput: Input;
  requestOutput: ReqOutput;
  data: Data;
}
