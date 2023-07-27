import { API } from "@common/types";
import { useHook, useMutationHook } from "@common/utils/use-hook";

export type UseSaveArtDraftProps<
  H extends API.Graphql.MutationHook<any> = API.Graphql.MutationHook<any>
> = ReturnType<H["useHook"]>;

export const useSaveArtDraftProps: UseSaveArtDraftProps = () => {
  const hook = useHook((hook: API.ManagementHooks) => {
    return hook.management.blog.article.draft.useSaveDraftProps;
  });
  return useMutationHook({ ...hook })();
};

export default useSaveArtDraftProps;
