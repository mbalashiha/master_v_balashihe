import { API } from "@common/types";
import { useHook, useRestApiHook } from "@common/utils/use-hook";

export type UsePrettierReact<
  H extends API.RestApi.RestApiHook<any> = API.RestApi.RestApiHook<any>
> = ReturnType<H["useHook"]>;

export const usePrettierReact: UsePrettierReact = () => {
  const hook = useHook((hooks) => {
    return hooks.management.api.usePrettierReact;
  });
  return useRestApiHook({ ...hook })();
};

export default usePrettierReact;
