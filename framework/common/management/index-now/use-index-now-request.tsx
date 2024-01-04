import { API } from "@common/types";
import { useHook, useMutationHook } from "@common/utils/use-hook";

export type UseIndexNowRequest<
  H extends API.Graphql.MutationHook<any> = API.Graphql.MutationHook<any>
> = ReturnType<H["useHook"]>;

export const useIndexNowRequest: UseIndexNowRequest = () => {
  const hook = useHook((hook: API.ManagementHooks) => {
    return hook.management.indexNow.useIndexNowRequest;
  });
  return useMutationHook({ ...hook })();
};

export default useIndexNowRequest;
