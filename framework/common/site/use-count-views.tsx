import { API } from "@common/types";
import { useHook, useRestApiHook } from "@common/utils/use-site-hook";

export type UseCountViews<
  H extends API.RestApi.RestApiHook<any> = API.RestApi.RestApiHook<any>
> = ReturnType<H["useHook"]>;

export const useCountViews: UseCountViews = () => {
  const hook = useHook((hooks) => {
    return hooks.site.useCountViews;
  });
  return useRestApiHook({ ...hook })();
};

export default useCountViews;
