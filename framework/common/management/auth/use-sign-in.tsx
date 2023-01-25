import { useHook, useRestApiHook } from "@common/utils/use-hook";

const useSignIn = () => {
  const hook = useHook((hooks) => {
    return hooks.management.auth.useSignIn;
  });
  return useRestApiHook({ ...hook });
};

export default useSignIn;
