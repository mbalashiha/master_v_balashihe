import { useManagementApiProvider } from "@common/management/utils";

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
