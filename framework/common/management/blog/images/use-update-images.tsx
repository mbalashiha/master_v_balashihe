import { API } from "@common/types";
import { useHook, useMutationHook } from "@common/utils/use-hook";

export type UseUpdateImages<
  H extends API.Graphql.MutationHook<any> = API.Graphql.MutationHook<any>
> = ReturnType<H["useHook"]>;

export const useUpdateImages: UseUpdateImages = () => {
  const hook = useHook((hook: API.ManagementHooks) => {
    return hook.management.blog.images.useUpdateImages;
  });
  return useMutationHook({ ...hook })();
};

export default useUpdateImages;
