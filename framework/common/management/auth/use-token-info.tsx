import { API } from "@common/types";
import { useHook, useSWRHook } from "@common/utils/use-hook";

export type UseTokenInfo<H extends API.Graphql.SWRHook<any> = API.Graphql.SWRHook<any>> = ReturnType<
  H["useHook"]
>;

const useTokenInfo: UseTokenInfo = () => {
  const hook = useHook((hook: API.Hooks) => {
    return hook.management.auth.useTokenInfo;
  });
  return useSWRHook({ ...hook })();
};

export default useTokenInfo;
