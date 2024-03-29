import { API } from "@common/types";
import { useHook, useSWRHook } from "@common/utils/use-hook";

export type UseTokenInfo<
  H extends API.Graphql.SWRHook<any> = API.Graphql.SWRHook<any>
> = ReturnType<H["useHook"]>;

export const useTokenInfo: UseTokenInfo = (initial: any) => {
  const hook = useHook((hook: API.ManagementHooks) => {
    return hook.management.auth.useTokenInfo;
  });
  return useSWRHook({ ...hook })(initial);
};

export default useTokenInfo;
