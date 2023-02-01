import { useSignIn } from "@common/management/auth";
import { UseSignIn } from "@common/management/auth/use-sign-in";
import { API } from "@common/types";
import { MANAGEMENT_LOGIN_API_URL } from "@framework/const";

export default useSignIn as UseSignIn<typeof handler>;

export interface SignInHook {
  requestInput: {
    login: string;
    password: string;
  };
  requestOutput: { success: boolean, error?: string };
  data: { success: boolean, error?: string };
}
export const handler: API.RestApi.RestApiHook<SignInHook> = {
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
  useHook:
    ({ restRequest }) =>
    () =>
    async (input) => {
      const response = await restRequest(input);
      return response;
    },
};
