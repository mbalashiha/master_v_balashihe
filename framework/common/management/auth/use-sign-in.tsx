import { useHook, useRestApiHook } from "@common/utils/use-hook";

export type UseSignIn<
  H extends API.Rest.RestApiHook<any> = API.Rest.RestApiHook<any>
> = ReturnType<H["useHook"]>;

const useSignIn: UseSignIn = () => {
  const hook = useHook((hooks) => {
    return hooks.management.auth.useSignIn;
  });
  return useRestApiHook({ ...hook })();
};

export default useSignIn;
