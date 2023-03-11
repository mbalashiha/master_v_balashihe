/* eslint-disable react-hooks/rules-of-hooks */
import { useTokenInfo } from "@common/management/auth";
import { UseTokenInfo } from "@common/management/auth/use-token-info";
import useLoginRoute from "@common/management/utils/hooks/use-login-route";
import { API } from "@common/types";
import { Management } from "@common/types/cms";
import { Schema } from "@framework/types";
import { normalizeManagerTokenInfo } from "./normalize";
import { verifyManagementToken } from "./queries/get-token-info";
import { useRouter } from "next/router";
import useFromLogin from "@common/management/utils/hooks/use-from-login";
import { MANAGER_LOGIN_URL, PAGE_MANAGER_LOGIN_URL } from "@framework/const";

export default useTokenInfo as UseTokenInfo<typeof handler>;

export interface TokenInfoHook {
  input: void;
  requestInput: void;
  requestOutput: Schema.Response.VerifyManagementTokenResponse;
  data: Management.ManagerTokenResponse;
}
export const handler: API.Graphql.SWRHook<TokenInfoHook> = {
  requestOptions: {
    query: verifyManagementToken,
  },
  async request({ request, options, input }) {
    const data = await request({ ...options, variables: input });
    return normalizeManagerTokenInfo(data);
  },
  useHook: ({ useData }) => {
    const router = useRouter();
    const { toLoginPage } = useLoginRoute();
    const { doRedirectAuthorized } = useFromLogin();
    return () => {
      const { data, isValidating, isLoading, ...rest } = useData();
      const isEmpty = !(
        data &&
        data.success &&
        data.manager &&
        data.manager.id
      );
      const managerWasNotAuthorized = isEmpty;
      if (!isValidating && !isLoading) {
        try {
          if (managerWasNotAuthorized) {
            toLoginPage();
          } else if (router.pathname === PAGE_MANAGER_LOGIN_URL) {
            doRedirectAuthorized();
          }
        } catch (e) {
          console.error(e);
        }
      }
      return { data, isEmpty, isValidating, isLoading, ...rest };
    };
  },
};
