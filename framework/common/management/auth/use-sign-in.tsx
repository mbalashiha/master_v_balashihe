import { API } from "@common/types";
import { useHook, useRestApiHook } from "@common/utils/use-hook";

export type UseSignIn<
  H extends API.RestApi.RestApiHook<any> = API.RestApi.RestApiHook<any>
> = ReturnType<H["useHook"]>;

const useSignIn: UseSignIn = () => {
  const hook = useHook((hooks) => {
    return hooks.management.auth.useSignIn;
  });
  return useRestApiHook({ ...hook })();
};

export default useSignIn;
