/* eslint-disable react-hooks/rules-of-hooks */
import { useTokenOneTime } from "@common/management/auth/use-token-one-time";
import { UseTokenOneTime } from "@common/management/auth/use-token-one-time";
import useLoginRoute from "@common/management/utils/hooks/use-login-route";
import { API } from "@common/types";
import { Management } from "@common/types/cms";
import { Schema } from "@framework/types";
import { useMemo } from "react";
import { normalizeManagerTokenInfo } from "./normalize";
import { verifyManagementToken } from "./queries/get-token-info";

export default useTokenOneTime as UseTokenOneTime<typeof handler>;

export interface TokenInfoHook {
  requestInput: void;
  requestOutput: Schema.QueryResponse.VerifyManagementTokenResponse;
  data: Management.ManagerTokenResponse;
}
export const handler: API.Graphql.OneTimeHook<TokenInfoHook> = {
  requestOptions: {
    query: verifyManagementToken,
  },
  async request({ request, options, input }) {
    const data = await request({ ...options, variables: input });
    return normalizeManagerTokenInfo(data);
  },
  useHook: ({ useOneTime }) => {
    const toLoginPage = useLoginRoute();
    return (initial) => {
      const { data, fetched, ...rest } = useOneTime({
        initial,
      });
      const isEmpty = !(
        data &&
        data.success &&
        data.manager &&
        data.manager.id
      );
      if (fetched) {
        if (isEmpty) {
          toLoginPage();
        }
      }
      return { data, isEmpty, fetched, ...rest };
    };
  },
};
