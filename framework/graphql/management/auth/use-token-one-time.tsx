/* eslint-disable react-hooks/rules-of-hooks */
import { useTokenOneTime } from "@common/management/auth/use-token-one-time";
import { UseTokenOneTime } from "@common/management/auth/use-token-one-time";
import useLoginRoute from "@common/management/utils/hooks/use-login-route";
import { API } from "@common/types";
import { Management } from "@common/types/cms";
import { Schema } from "@framework/types";
import { normalizeManagerTokenInfo } from "./normalize";
import { verifyManagementToken } from "./queries/get-token-info";
import Cookies from "js-cookie";
import React from "react";

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
      const hasCookie = Cookies.get("manager_signed_in");
      if (!hasCookie) {
        toLoginPage();
      }
      let { data, isValidating, isLoading, ...rest } = useData({
        swrOptions: {
          revalidateIfStale: false,
          revalidateOnFocus: false,
          revalidateOnReconnect: false,
        },
      });
      const managerWasNotAuthorized = !(
        data &&
        data.success &&
        data.manager &&
        data.manager.id
      );
      data = React.useMemo(
        () => ({
          ...data,
          manager: {
            ...data?.manager,
            friendlyName: data?.manager?.friendlyName || "",
            id: data?.manager?.id || "",
            isAdmin: data?.manager?.isAdmin || false,
          },
        }),
        [data]
      ) as any;
      React.useMemo(() => {
        if (!isValidating && !isLoading) {
          try {
            if (managerWasNotAuthorized) {
              Cookies.remove("manager_signed_in");
              toLoginPage();
            }
          } catch (e) {
            console.error(e);
          }
        }
        if (!managerWasNotAuthorized && !isValidating && !isLoading) {
          Cookies.set("manager_signed_in", "1", { expires: 90 });
        }
      }, [managerWasNotAuthorized, isValidating, isLoading]);
      return {
        data,
        isEmpty: managerWasNotAuthorized,
        isValidating,
        isLoading,
        ...rest,
      };
    };
  },
};
