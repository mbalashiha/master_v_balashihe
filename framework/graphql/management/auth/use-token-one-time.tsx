/* eslint-disable react-hooks/rules-of-hooks */
import { useTokenOneTime } from "@common/management/auth/use-token-one-time";
import { UseTokenOneTime } from "@common/management/auth/use-token-one-time";
import { API } from "@common/types";
import { Management } from "@common/types/cms";
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
  useHook:
    ({ useOneTime }) =>
    (initial) => {
      const { data, fetched, ...rest } = useOneTime({
        initial,
        swrOptions: {},
      });
      // return useMemo(() => {
      //   return { data, isEmpty: !data };
      // }, [data]);
      return { data, fetched, ...rest };
    },
};
