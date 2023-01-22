import { useHook } from "@common/utils/use-hook";

const useSignIn = () => {
  const hook = useHook((hooks) => {
    return hooks.management.auth.useSignIn;
  });
  return hook.useHook({
    request: hook.request,
  });
};

export default useSignIn;
