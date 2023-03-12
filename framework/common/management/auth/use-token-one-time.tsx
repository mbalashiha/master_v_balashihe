import { API } from "@common/types";
import { useHook, useSWRHook } from "@common/utils/use-hook";

export type UseTokenOneTime<
  H extends API.Graphql.SWRHook<any> = API.Graphql.SWRHook<any>
> = ReturnType<H["useHook"]>;

export const useTokenOneTime: UseTokenOneTime = (initial: any) => {
  const hook = useHook((hook: API.Hooks) => {
    return hook.management.auth.useTokenOneTime;
  });
  return useSWRHook({ ...hook })(initial);
};

export default useTokenOneTime;
