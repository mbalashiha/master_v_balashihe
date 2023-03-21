import { useManagementApiProvider } from "@common/management/utils";
import { API } from "@common/types";
import React, { useCallback, useEffect } from "react";
import { unstable_serialize, useSWRConfig } from "swr";
import useSWR from "swr";
import { useSnackbar } from "notistack";

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
  hook: API.Graphql.SWRHook<any>,
  ctx: API.Graphql.UseDataContext<any, any, any>
) => {
  let input, key;
  if (ctx?.isReady === false) {
    return { input: null, key: null };
  }
  if (ctx?.variables && typeof ctx.variables === "object") {
    input = input || {};
    input = { ...input, ...ctx.variables };
  }
  if (ctx?.initial?.variables && typeof ctx?.initial?.variables === "object") {
    input = input || {};
    input = { ...input, ...ctx?.initial?.variables };
  }
  if (ctx?.swrKey) {
    key = ctx.swrKey;
  } else if (hook.swrKey) {
    key = hook.swrKey;
  } else {
    if (input) {
      key = unstable_serialize([hook.requestOptions.query, input]);
    } else {
      key = hook.requestOptions.query;
    }
  }
  return { input, key };
};

const useData = (
  hook: API.Graphql.SWRHook<any>,
  request: API.Graphql.RequestFunction<any, any>,
  ctx: API.Graphql.UseDataContext<any, any, any>
) => {
  const { enqueueSnackbar } = useSnackbar();
  const { input, key } = useSWROptions(hook, ctx);
  const hookRequest = async () => {
    try {
      return await hook.request({
        input,
        request,
        options: hook.requestOptions,
      });
    } catch (e: any) {
      console.error(e.stack || e.message || e);
      throw e;
    }
  };
  const response = useSWR(key, hookRequest, ctx?.swrOptions);
  const { error } = response;
  const errorMessage = (error && error.message) || null;
  useEffect(() => {
    if (errorMessage && enqueueSnackbar) {
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  }, [errorMessage, enqueueSnackbar]);
  return response;
};

export const useSWRHook = (
  hook: API.Graphql.SWRHook<API.SwrHookDescriptor>
) => {
  const { request } = useManagementApiProvider();
  return hook.useHook({
    useData: (ctx: API.Graphql.UseDataContext<any, any, any>) => {
      const data = useData(hook, request, ctx);
      return data;
    },
  });
};
