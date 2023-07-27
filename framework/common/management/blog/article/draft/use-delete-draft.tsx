import { API } from "@common/types";
import { useHook, useMutationHook } from "@common/utils/use-hook";

export type UseDeleteDraft<
  H extends API.Graphql.MutationHook<any> = API.Graphql.MutationHook<any>
> = ReturnType<H["useHook"]>;

export const useDeleteDraft: UseDeleteDraft = () => {
  const hook = useHook((hook: API.ManagementHooks) => {
    return hook.management.blog.article.draft.useDeleteDraft;
  });
  return useMutationHook({ ...hook })();
};

export default useDeleteDraft;
