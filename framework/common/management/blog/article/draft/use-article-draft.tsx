import { API } from "@common/types";
import { useHook, useSWRHook } from "@common/utils/use-hook";

export type UseArticleDraft<
  H extends API.Graphql.SWRHook<any> = API.Graphql.SWRHook<any>
> = ReturnType<H["useHook"]>;

export const useArticleDraft: UseArticleDraft = (initial: any) => {
  const hook = useHook((hook: API.Hooks) => {
    return hook.management.blog.article.draft.useArticleDraft;
  });
  return useSWRHook({ ...hook })(initial);
};

export default useArticleDraft;
