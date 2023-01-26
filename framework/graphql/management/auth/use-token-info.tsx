import { useTokenInfo } from "@common/management/auth";
import { verifyManagementToken } from "./queries/get-token-info";

export default useTokenInfo;

export const handler = {
  requestOptions: {
    query: verifyManagementToken,
  },
  async request({ request, options }: any) {
    const data = await request({ ...options });
    debugger;
    return { data };
  },
  useHook({ useData }: any) {
    debugger;
    const data = useData();
    debugger;
    return { data };
    // const data = request();

    // return { data };
  },
};
