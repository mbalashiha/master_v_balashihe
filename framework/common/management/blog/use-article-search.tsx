import { API } from "@common/types";
import { useHook, useMutationHook } from "@common/utils/use-hook";

export type UseArticleSearch<
  H extends API.Graphql.MutationHook<any> = API.Graphql.MutationHook<any>
> = ReturnType<H["useHook"]>;

export const useArticleSearch: UseArticleSearch = () => {
  const hook = useHook((hook: API.ManagementHooks) => {
    return hook.management.blog.useArticleSearch;
  });
  return useMutationHook({ ...hook })();
};

export default UseArticleSearch;
