/* eslint-disable react-hooks/rules-of-hooks */
import { useTokenOneTime } from "@common/management/auth/use-token-one-time";
import { UseTokenOneTime } from "@common/management/auth/use-token-one-time";
import useLoginRoute from "@common/management/utils/hooks/use-login-route";
import { API } from "@common/types";
import { Management } from "@common/types/cms";
import { Schema } from "@framework/types";
import { normalizeManagerTokenInfo } from "./normalize";
import { verifyManagementToken } from "./queries/get-token-info";

export default useTokenOneTime as UseTokenOneTime<typeof handler>;

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
    const { toLoginPage } = useLoginRoute();
    return () => {
      const { data, ...rest } = useData({
        swrOptions: {
          revalidateOnFocus: false,
          revalidateOnReconnect: false,
          focusThrottleInterval: 8 * 60 * 1000,
        },
      });
      const isEmpty = !(
        data &&
        data.success &&
        data.manager &&
        data.manager.id
      );
      const managerWasNotAuthorized = isEmpty;
      if (data && managerWasNotAuthorized) {
        toLoginPage();
      }
      return { data, isEmpty, ...rest };
    };
  },
};
