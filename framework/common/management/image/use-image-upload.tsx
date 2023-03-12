import { API } from "@common/types";
import { useHook, useRestApiHook } from "@common/utils/use-hook";

export type UseImageUpload<
  H extends API.RestApi.RestApiHook<any> = API.RestApi.RestApiHook<any>
> = ReturnType<H["useHook"]>;

export const useImageUpload: UseImageUpload = () => {
  const hook = useHook((hooks) => {
    return hooks.management.image.useImageUpload;
  });
  return useRestApiHook({ ...hook })();
};

export default useImageUpload;
