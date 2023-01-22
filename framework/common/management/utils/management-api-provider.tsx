import { createContext, useContext, useMemo } from "react";
export const ManagementApiContext = createContext<
  Partial<API.ApiProviderContext>
>({});

interface Props {
  children: React.ReactNode | React.ReactNode[];
  config: API.Config;
  hooks: API.Hooks;
}

export const ManagementApiProvider = ({ children, config, hooks }: Props) => {
  const coreConfig = useMemo(
    () => ({
      request: config.request,
      restRequest: config.restRequest,
      hooks,
    }),
    [config.request, config.restRequest, hooks]
  );
  return (
    <ManagementApiContext.Provider value={coreConfig}>
      {children}
    </ManagementApiContext.Provider>
  );
};

export const useManagementApiProvider = () => {
  return useContext(ManagementApiContext) as API.ApiProviderContext;
};
