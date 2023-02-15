import { useManagementApiProvider } from "@common/management/utils";
import { API } from "@common/types";
import React, { useCallback } from "react";
import { useSWRConfig } from "swr";
import useSWR from "swr";

export const useHook = <H>(hookHandler: (apiHooks: API.Hooks) => H) => {
  const { hooks } = useManagementApiProvider();
  return hookHandler(hooks);
};
export const useFetchHook = (hook: API.Graphql.MutationHook<any>) => {
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
const useSWROptions = (
  hook: API.Graphql.OneTimeHook<any> | API.Graphql.SWRHook<any>,
  ctx?: API.Graphql.UseDataContext<any, any>
) => {
  return React.useMemo(() => {
    let input, key;
    if (ctx?.isReady === false) {
      return { input, key: null };
    }
    if (ctx?.variables && typeof ctx?.variables === "object") {
      input = input || {};
      input = { ...input, ...ctx?.variables };
    }
    if (
      ctx?.initial?.variables &&
      typeof ctx?.initial?.variables === "object"
    ) {
      input = input || {};
      input = { ...input, ...ctx?.initial?.variables };
    }
    if (hook.swrKey) {
      key = hook.swrKey;
    } else {
      key = input
        ? [hook.requestOptions.query, input]
        : hook.requestOptions.query;
    }
    return { input, key };
  }, [
    hook.swrKey,
    ctx?.variables,
    ctx?.initial?.variables,
    hook.requestOptions.query,
    ctx?.isReady,
  ]);
};
const useOneTime = (
  hook: API.Graphql.OneTimeHook<any>,
  request: API.Graphql.RequestFunction<any, any>,
  ctx?: API.Graphql.UseDataContext<any, any>
) => {
  const [data, setData] = React.useState<any>(undefined);
  const [fetched, setFetched] = React.useState(false);
  const { input, key } = useSWROptions(hook, ctx);
  const { mutate: swrConfigMutate } = useSWRConfig();
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
  const {
    data: swrData,
    isValidating,
    isLoading,
    error,
    mutate: swrMutate,
    ...rest
  } = useSWR(fetched ? null : key, hookRequest, ctx?.swrOptions);
  const mutate: typeof swrMutate = useCallback(
    (data, opts) => {
      setData(data);
      try {
        return swrConfigMutate(key, data, opts);
      } catch (e: any) {
        console.error(e?.stack || e?.message || e);
        throw e;
      }
    },
    [key, swrConfigMutate]
  );
  if (!fetched && !isValidating && !isLoading && !error && key) {
    setData(swrData);
    setFetched(true);
  }
  const outData = data || swrData;
  return {
    data: outData,
    fetched,
    error,
    isValidating,
    isLoading,
    mutate,
    ...rest,
  };
};

export const useOneTimeHook = (hook: API.Graphql.OneTimeHook<any>) => {
  const { request } = useManagementApiProvider();
  return hook.useHook({
    useOneTime(ctx: any) {
      const data = useOneTime(hook, request, ctx);
      return data;
    },
  });
};

const useData = (
  hook: API.Graphql.SWRHook<any>,
  request: API.Graphql.RequestFunction<any, any>,
  ctx?: API.Graphql.UseDataContext<any, any>
) => {
  const { input, key } = useSWROptions(hook, ctx);
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
  const response = useSWR(key, hookRequest, ctx?.swrOptions);
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
