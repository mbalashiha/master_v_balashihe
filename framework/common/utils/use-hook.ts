import { useManagementApiProvider } from "@common/management/utils";
import { DeblurSharp } from "@mui/icons-material";
import React from "react";

export const useHook = (fn: (apiHooks: API.Hooks) => API.RestApiHook) => {
  const { hooks } = useManagementApiProvider();
  return fn(hooks);
};

export const useFetchDataHook = (hook: API.FetchDataHook) => {
  const { request } = useManagementApiProvider();
  return hook.useHook({
    request: (input: any) => {
      return hook.request({
        input,
        options: hook.requestOptions,
        request,
      });
    },
  });
};
export const useMutationHook = (hook: API.MutationHook) => {
  const { request } = useManagementApiProvider();
  return hook.useHook({
    request: (input: any) => {
      return hook.request({
        input,
        options: hook.requestOptions,
        request,
      });
    },
  });
};
export const useRestApiHook = (hook: API.RestApiHook) => {
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

const useData = (hook: any, request: API.ApiRequest) => {
  const [data, setData] = React.useState(null);
  const hookRequest = async () => {
    try {
      return await hook.request({ request, options: hook.requestOptions });
    } catch (e: any) {
      throw e;
    }
  };
  debugger;
  if (!data) {
    hookRequest().then((data) => {
      setData(data as any);
    });
  }
  debugger;
  return data;
};

export const useSWRHook = (hook: any) => {
  const { request } = useManagementApiProvider();
  return hook.useHook({
    useData() {
      debugger;
      const data = useData(hook, request);
      debugger;
      return data;
    },
  });
};

