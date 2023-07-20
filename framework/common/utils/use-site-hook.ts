export * from "./use-hook";
import { useData } from "./use-hook";
import { useApiProvider } from "@common/api-provider";
import { API } from "@common/types";

export const useHook = <H>(hookHandler: (apiHooks: API.SiteHooks) => H) => {
  const { hooks } = useApiProvider();
  return hookHandler(hooks);
};
export const useSWRHook = (
  hook: API.Graphql.SWRHook<API.SwrHookDescriptor>
) => {
  const { request } = useApiProvider();
  return hook.useHook({
    useData: (ctx: API.Graphql.UseDataContext<any, any, any>) => {
      const data = useData(hook, request, ctx);
      return data;
    },
  });
};
export const useRestApiHook = (hook: API.RestApi.RestApiHook<any>) => {
  const { restRequest } = useApiProvider();
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
export const useMutationHook = (hook: API.Graphql.MutationHook<any>) => {
  const { request } = useApiProvider();
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
