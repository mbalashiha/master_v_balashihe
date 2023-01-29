import { useManagementApiProvider } from "@common/management/utils";
import { API } from "@common/types";
import React from "react";
import useSWR from "swr";

export const useHook = <H>(hookHandler: (apiHooks: API.Hooks) => H) => {
  const { hooks } = useManagementApiProvider();
  return hookHandler(hooks);
};

export const useMutationHook = (hook: API.Graphql.MutationHook<any>) => {
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
export const useRestApiHook = (hook: API.RestApi.RestApiHook<any>) => {
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

const useOneTime = (
  hook: any,
  request: API.Graphql.RequestFunction<any, any>,
  ctx: any
) => {
  const [data, setData] = React.useState(undefined);
  const [fetched, setFetched] = React.useState(false);
  const hookRequest = async (query: string) => {
    if (fetched) {
      return null;
    }
    try {
      return await hook.request({
        request,
        options: { ...hook.requestOptions, query },
      });
    } catch (e: any) {
      throw e;
    }
  };
  const {
    data: swrData,
    isValidating,
    isLoading,
    error,
  } = useSWR(
    fetched ? null : hook.requestOptions.query,
    hookRequest,
    ctx?.swrOptions
  );
  if (!fetched && !isValidating && !isLoading && !error) {
    setData(swrData);
    setFetched(true);
  }
  const outData = data || swrData;
  if (error) {
    return { data: outData, fetched, error };
  } else {
    return { data: outData, fetched };
  }
};

// export const useOneTimeHook = (hook: API.Graphql.OneTimeHook<any>) => {
//   const { request } = useManagementApiProvider();
//   return hook.useHook({
//     useOneTime(ctx: any) {
//       const data = useOneTime(hook, request, ctx);
//       return data;
//     },
//   });
// };

const useData = (
  hook: API.Graphql.SWRHook<any>,
  request: API.Graphql.RequestFunction<any, any>,
  ctx: API.Graphql.UseDataContext<any, any>
) => {
  const { input, key } = React.useMemo(() => {
    let input, key;
    if (ctx?.variables || ctx?.initial?.variables) {
      const preObject = { ...ctx?.variables, ...ctx?.initial?.variables };
      if (Object.keys(preObject).length) {
        input = preObject;
      }
    }
    key = input
      ? [hook.requestOptions.query, input]
      : hook.requestOptions.query;
    return { input, key };
  }, [ctx?.variables, ctx?.initial?.variables, hook.requestOptions.query]);
  const hookRequest = async () => {
    try {
      return await hook.request({
        input,
        request,
        options: hook.requestOptions,
      });
    } catch (e: any) {
      throw e;
    }
  };
  const response = useSWR(
    key,
    hookRequest,
    ctx?.swrOptions
  );
  return response;
};

export const useSWRHook = (hook: API.Graphql.SWRHook<API.HookDescriptor>) => {
  const { request } = useManagementApiProvider();
  return hook.useHook({
    useData: (ctx: any) => {
      const data = useData(hook, request, ctx);
      return data;
    },
  });
};
