import { useHook, useSWRHook } from "@common/utils/use-hook";

const useTokenInfo = () => {
  const hook = useHook((hook: API.Hooks) => {
    return hook.management.auth.useTokenInfo;
  });
  return useSWRHook({ ...hook });
};

export default useTokenInfo;
