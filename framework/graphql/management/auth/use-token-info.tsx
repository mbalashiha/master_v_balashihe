import { useTokenInfo } from "@common/management/auth";
import { useMemo } from "react";
import { normalizeManagerTokenInfo } from "./normalize";
import { verifyManagementToken } from "./queries/get-token-info";

export default useTokenInfo;

export const handler = {
  requestOptions: {
    query: verifyManagementToken,
  },
  async request({ request, options }: any) {
    const data = await request({ ...options });
    return data && normalizeManagerTokenInfo(data);
  },
  useHook({ useData }: any) {
    const { data, isValidating } = useData({ swrOptions: {
      revalidateOnFocus: false,
    }});
    if (data) {
      console.log(data);
    }
    return useMemo(() => {
      return { data, isEmpty: !data };
    }, [data]);
  },
};
