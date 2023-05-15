import { useSignIn } from "@common/management/auth";
import { UseSignIn } from "@common/management/auth/use-sign-in";
import { API } from "@common/types";
import { Management } from "@common/types/cms";
import { useLoginProvider } from "@components/management/LoginLayout";
import { MANAGEMENT_LOGIN_API_URL } from "@framework/const";
import Cookies from "js-cookie";

export default useSignIn as UseSignIn<typeof handler>;

export interface SignInHook {
  requestInput: {
    login: string;
    password: string;
  };
  requestOutput: Management.ManagerTokenResponse;
  data: Management.ManagerTokenResponse;
}
export const handler: API.RestApi.RestApiHook<SignInHook> = {
  options: {
    url: MANAGEMENT_LOGIN_API_URL,
    enc: true,
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
    const { authData, doRedirectAuthorized } = useLoginProvider();
    return () => async (input) => {
      const response = await restRequest(input);
      if (response.success) {
        Cookies.set("manager_signed_in", "1", { expires: 90 });
        authData.mutate({ ...response }, false);
      }
      return response;
    };
  },
};
