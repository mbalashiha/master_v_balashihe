import { API } from "@common/types";
import { useHook, useMutationHook } from "@common/utils/use-hook";

export type UseSaveArticleText<
  H extends API.Graphql.MutationHook<any> = API.Graphql.MutationHook<any>
> = ReturnType<H["useHook"]>;

export const useSaveArticleText: UseSaveArticleText = () => {
  const hook = useHook((hook: API.Hooks) => {
    return hook.management.blog.useSaveArticleText;
  });
  return useMutationHook({ ...hook })();
};

export default useSaveArticleText;
