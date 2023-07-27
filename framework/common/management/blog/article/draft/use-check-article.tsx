import { API } from "@common/types";
import { useHook, useMutationHook } from "@common/utils/use-hook";

export type UseCheckArticle<
  H extends API.Graphql.MutationHook<any> = API.Graphql.MutationHook<any>
> = ReturnType<H["useHook"]>;

export const useCheckArticle: UseCheckArticle = () => {
  const hook = useHook((hook: API.ManagementHooks) => {
    return hook.management.blog.article.draft.useCheckArticle;
  });
  return useMutationHook({ ...hook })();
};

export default UseCheckArticle;
