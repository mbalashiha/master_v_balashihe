import { useSignIn } from "@common/management/auth";
import { MANAGEMENT_LOGIN_API_URL } from "@framework/const";
import { string } from "yup";

export default useSignIn;

export const handler: API.RestApiHook = {
  options: {
    url: MANAGEMENT_LOGIN_API_URL,
    enc: true,
  },
  restRequest: async ({ restRequest, input, options }) => {
    console.log("Fetching Data!");
    try {
      const resp = await restRequest({
        ...options,
        variables: input,
      });
      console.log(resp);
    } catch (e: any) {
      console.error(e.stack || e.message || e);
    }
    return JSON.stringify(input) + "_MODIFIED";
  },
  useHook: ({ restRequest }) => {
    return async (input: any) => {
      const response = await restRequest(input);
      return { output: response };
    };
  },
};
