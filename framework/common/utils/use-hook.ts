import { useManagementApiProvider } from "@common/management/utils";

export const useHook = (fn: (apiHooks: API.Hooks) => any) => {
  const { hooks } = useManagementApiProvider();
  return fn(hooks);
};
