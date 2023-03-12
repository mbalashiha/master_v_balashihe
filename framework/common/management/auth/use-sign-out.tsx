import { API } from "@common/types";
import { useHook, useRestApiHook } from "@common/utils/use-hook";

export type UseSignOut<
  H extends API.RestApi.RestApiHook<any> = API.RestApi.RestApiHook<any>
> = ReturnType<H["useHook"]>;

export const useSignOut: UseSignOut = () => {
  const hook = useHook((hooks) => {
    return hooks.management.auth.useSignOut;
  });
  return useRestApiHook({ ...hook })();
};

export default useSignOut;
