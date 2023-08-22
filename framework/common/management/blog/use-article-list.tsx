import { API } from "@common/types";
import { useHook, useSWRHook } from "@common/utils/use-hook";
import util from "util";

export type UseArticleList<
  H extends API.Graphql.SWRHook<any> = API.Graphql.SWRHook<any>
> = ReturnType<H["useHook"]>;

export const useArticleList: UseArticleList = (initial: any) => {
  const hook = useHook((hook: API.ManagementHooks) => {
    return hook.management.blog.useArticleList;
  });

  return useSWRHook({ ...hook })(initial);
};

export default UseArticleList;
