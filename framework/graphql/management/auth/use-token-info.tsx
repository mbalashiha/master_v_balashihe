import { useTokenInfo } from "@common/management/auth";
import { UseTokenInfo } from "@common/management/auth/use-token-info";
import { API } from "@common/types";
import { Management } from "@common/types/cms";
import { useMemo } from "react";
import { normalizeManagerTokenInfo } from "./normalize";
import { verifyManagementToken } from "./queries/get-token-info";

export default useTokenInfo as UseTokenInfo<typeof handler>;

export interface TokenInfoHook {
  requestInput: void;
  requestOutput: Schema.QueryResponse.VerifyManagementTokenResponse;
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
  useHook:
    ({ useData }) =>
    (initial) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { data, isValidating, ...rest } = useData({
        initial,
        swrOptions: {
          revalidateOnFocus: false,
        },
      });
      // return useMemo(() => {
      //   return { data, isEmpty: !data };
      // }, [data]);
      return { data, isEmpty: !data, isValidating, ...rest };
    },
};
