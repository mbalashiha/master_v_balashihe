import { API } from "@common/types";
import { useHook, useMutationHook } from "@common/utils/use-hook";

export type UseDeleteArticle<
  H extends API.Graphql.MutationHook<any> = API.Graphql.MutationHook<any>
> = ReturnType<H["useHook"]>;

export const useDeleteArticle: UseDeleteArticle = () => {
  const hook = useHook((hook: API.Hooks) => {
    return hook.management.blog.article.useDeleteArticle;
  });
  return useMutationHook({ ...hook })();
};

export default useDeleteArticle;
