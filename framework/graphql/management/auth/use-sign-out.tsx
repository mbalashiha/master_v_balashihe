import { useSignOut } from "@common/management/auth";
import { UseSignOut } from "@common/management/auth/use-sign-out";
import { useManagementLayoutProvider } from "@common/management/utils";
import useLoginRoute from "@common/management/utils/hooks/use-login-route";
import { API } from "@common/types";
import { LOGIN_SIGN_OUT_API_URL } from "@framework/const";

export default useSignOut as UseSignOut<typeof handler>;

export interface SignOutHook {
  requestInput: void;
  requestOutput: { success: boolean; error?: string };
  data: { success: boolean; error?: string };
}
export const handler: API.RestApi.RestApiHook<SignOutHook> = {
  options: {
    url: LOGIN_SIGN_OUT_API_URL,
    method: "get",
  },
  restRequest: async ({ restRequest, input, options }) => {
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
    const { mutateAuthInfo } = useManagementLayoutProvider();
    const { toLoginPage } = useLoginRoute();
    return () => async (input) => {
      const response = await restRequest(input);
      if (response.success) {
        mutateAuthInfo(undefined, false);
        toLoginPage();
      }
      return response;
    };
  },
};
