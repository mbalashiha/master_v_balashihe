import { API } from "@common/types";
import { useHook, useMutationHook } from "@common/utils/use-hook";

export type UseSaveArticle<
  H extends API.Graphql.MutationHook<any> = API.Graphql.MutationHook<any>
> = ReturnType<H["useHook"]>;

export const useSaveArticle: UseSaveArticle = () => {
  const hook = useHook((hook: API.Hooks) => {
    return hook.management.blog.article.useSaveArticle;
  });
  return useMutationHook({ ...hook })();
};

export default useSaveArticle;
