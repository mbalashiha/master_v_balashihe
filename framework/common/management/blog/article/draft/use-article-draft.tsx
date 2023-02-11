import { API } from "@common/types";
import { useHook, useOneTimeHook } from "@common/utils/use-hook";

export type UseArticleDraft<H extends API.Graphql.OneTimeHook<any> = API.Graphql.OneTimeHook<any>> = ReturnType<
  H["useHook"]
>;

export const useArticleDraft: UseArticleDraft = (initial) => {
  const hook = useHook((hook: API.Hooks) => {
    return hook.management.blog.article.draft.useArticleDraft;
  });
  return useOneTimeHook({ ...hook })(initial);
};

export default useArticleDraft;
