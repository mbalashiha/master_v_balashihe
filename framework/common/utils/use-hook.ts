import { useManagementApiProvider } from "@common/management/utils";
import { DeblurSharp } from "@mui/icons-material";
import React from "react";
import useSWR from "swr";

export const useHook = (fn: (apiHooks: API.Hooks) => API.Rest.RestApiHook<any>) => {
  const { hooks } = useManagementApiProvider();
  return fn(hooks);
};

export const useMutationHook = (hook: API.Graphql.MutationHook<any>) => {
  const { request } = useManagementApiProvider();
  return hook.useHook({
    request: (input: any) => {
      debugger;
      return hook.request({
        input,
        options: hook.requestOptions,
        request,
      });
    },
  });
};
export const useRestApiHook = (hook: API.Rest.RestApiHook<any>) => {
  const { restRequest } = useManagementApiProvider();
  return hook.useHook({
    restRequest: (input: any) => {
      return hook.restRequest({
        input,
        options: hook.options,
        restRequest,
      });
    },
  });
};

const useData = (hook: any, request: API.Graphql.RequestFunction<any, any>, ctx: any) => {
  const [data, setData] = React.useState(null);
  const hookRequest = async (query: string) => {
    try {
      return await hook.request({ request, options: { query } });
    } catch (e: any) {
      throw e;
    }
  };
  const response = useSWR(
    hook.requestOptions.query,
    hookRequest,
    ctx?.swrOptions
  );
  return response;
};

export const useSWRHook = (hook: any) => {
  const { request } = useManagementApiProvider();
  return hook.useHook({
    useData(ctx: any) {
      const data = useData(hook, request, ctx);
      return data;
    },
  });
};
