import { API } from "@common/types";
import { useHook, useSWRHook } from "@common/utils/use-hook";

export type UseArticleList<H extends API.Graphql.SWRHook<any> = API.Graphql.SWRHook<any>> = ReturnType<
  H["useHook"]
>;

export const useArticleList: UseArticleList = (initial) => {
  const hook = useHook((hook: API.Hooks) => {
    return hook.management.blog.useArticleList;
  });
  return useSWRHook({ ...hook })(initial);
};

export default UseArticleList;