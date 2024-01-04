/* eslint-disable react-hooks/rules-of-hooks */
import { useIndexNowRequest } from "@common/management/index-now/use-index-now-request";
import { UseIndexNowRequest } from "@common/management/index-now/use-index-now-request";
import { API, CMS } from "@common/types";
import { ID, Schema } from "@framework/types";
import { locale } from "@utils/locale";
import { useSnackbar } from "notistack";
import { useRef } from "react";
import { sendIndexNowRequest } from "./mutations/sendIndexNowRequest";
export default useIndexNowRequest as UseIndexNowRequest<typeof handler>;

export interface UseIndexNowRequestHook {
  requestInput: {
    apiUrl: string;
    nodes: Array<{
      uuid: string;
      apiUrl: string;
    }>;
  };
  requestOutput: Schema.Response.SendIndexNowRequestResponse;
  data: {
    message: string;
    error?: string;
    apiUrl: string;
    ok: boolean;
    status: number;
    statusText: string;
    urlList: string[];
    siteHost: string;
  };
}
export const handler: API.Graphql.MutationHook<UseIndexNowRequestHook> = {
  requestOptions: {
    query: sendIndexNowRequest,
  },
  async request({ request, options, input }) {
    try {
      const variables = {
        ...input,
      };
      const data = await request({ ...options, variables });
      const res = data.sendIndexNowRequest as any;
      return {
        ...res,
      };
    } catch (e: any) {
      console.error(e.stack || e.message || e);
      throw e;
    }
  },
  useHook: ({ request }) => {
    const { enqueueSnackbar } = useSnackbar();
    return () => async (input) => {
      try {
        const response = await request(input);
        if (response.message || response.error) {
          enqueueSnackbar(
            (response.message || response.error || "").substring(0, 512),
            (response.error && {
              variant: "error",
            }) ||
              undefined
          );
        }
        return response;
      } catch (e: any) {
        enqueueSnackbar(
          (e.message || e.error || "Error occured").substring(0, 312),
          {
            variant: "error",
          }
        );
        throw e;
      }
    };
  },
};
