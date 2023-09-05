import { API } from "@common/types";
import { useHook, useRestApiHook } from "@common/utils/use-site-hook";

export type UseSendRequest<
  H extends API.RestApi.RestApiHook<any> = API.RestApi.RestApiHook<any>
> = ReturnType<H["useHook"]>;

export const useSendRequest: UseSendRequest = () => {
  const hook = useHook((hooks) => {
    return hooks.site.contact.useSendRequest;
  });
  return useRestApiHook({ ...hook })();
};

export default useSendRequest;
