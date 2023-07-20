import { API } from "@common/types";
import { useHook, useRestApiHook } from "@common/utils/use-site-hook";

export type UseSendEmail<
  H extends API.RestApi.RestApiHook<any> = API.RestApi.RestApiHook<any>
> = ReturnType<H["useHook"]>;

export const useSendEmail: UseSendEmail = () => {
  const hook = useHook((hooks) => {
    return hooks.site.contact.useSendEmail;
  });
  return useRestApiHook({ ...hook })();
};

export default useSendEmail;
