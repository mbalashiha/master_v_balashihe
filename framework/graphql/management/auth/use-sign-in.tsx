import { useSignIn } from "@common/management/auth";
import { MANAGEMENT_LOGIN_API_URL } from "@framework/const";

export default useSignIn;
export interface SignInHook {
  requestInput: {
    login: string;
    password: string;
  };
  requestOutput: { success: boolean };
  data: { success: boolean };
}
export const handler: API.Rest.RestApiHook<SignInHook> = {
  options: {
    url: MANAGEMENT_LOGIN_API_URL,
    enc: true,
  },
  restRequest: async ({ restRequest, input, options }) => {
    console.log("Fetching Data!");
    try {
      const { data } = await restRequest({
        ...options,
        variables: input,
      });
      return data;
    } catch (e: any) {
      console.error(e.stack || e.message || e);
      throw e;
    }
  },
  useHook: ({ restRequest }) => {
    return async (input) => {
      const response = await restRequest(input);
      debugger;
      return response;
    };
  },
};
