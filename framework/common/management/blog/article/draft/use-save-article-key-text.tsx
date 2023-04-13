import { API } from "@common/types";
import { useHook, useMutationHook } from "@common/utils/use-hook";

export type UseSaveArticleKeyText<
  H extends API.Graphql.MutationHook<any> = API.Graphql.MutationHook<any>
> = ReturnType<H["useHook"]>;

export const useSaveArticleKeyText: UseSaveArticleKeyText = () => {
  const hook = useHook((hook: API.Hooks) => {
    return hook.management.blog.article.draft.useSaveArticleKeyText;
  });
  return useMutationHook({ ...hook })();
};

export default useSaveArticleKeyText;
