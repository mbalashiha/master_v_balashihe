import { API } from "@common/types";
import { useHook, useSWRHook } from "@common/utils/use-hook";

export type UseTemplateList<
  H extends API.Graphql.SWRHook<any> = API.Graphql.SWRHook<any>
> = ReturnType<H["useHook"]>;

export const useTemplateList: UseTemplateList = (initial: any) => {
  const hook = useHook((hook: API.ManagementHooks) => {
    return hook.management.blog.article.useTemplateList;
  });
  return useSWRHook({ ...hook })(initial);
};

export default UseTemplateList;
