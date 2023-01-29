


import { API } from "@common/types";
import { useHook, useOneTimeHook } from "@common/utils/use-hook";

export type UseTokenOneTime<H extends API.Graphql.OneTimeHook<any> = API.Graphql.OneTimeHook<any>> = ReturnType<
  H["useHook"]
>;

export const useTokenOneTime: UseTokenOneTime = (initial) => {
  const hook = useHook((hook: API.Hooks) => {
    return hook.management.auth.useTokenOneTime;
  });
  return useOneTimeHook({ ...hook })(initial);
};

export default useTokenOneTime;
