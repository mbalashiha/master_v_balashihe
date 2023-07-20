import { API } from "@common/types";
import React from "react";
import { createContext, useContext, useMemo } from "react";
type ProviderContext = API.ApiProviderContext<API.ManagementHooks>;
export const ManagementApiContext = createContext<Partial<ProviderContext>>({});

interface Props {
  children: React.ReactNode | React.ReactNode[];
  config: API.Config;
  hooks: API.ManagementHooks;
}

export const ManagementApiProvider = ({ children, config, hooks }: Props) => {
  const coreConfig = {
    request: config.request,
    restRequest: config.restRequest,
    hooks,
  };
  return (
    <ManagementApiContext.Provider value={coreConfig}>
      {children}
    </ManagementApiContext.Provider>
  );
};

export const useManagementApiProvider = () => {
  return useContext(ManagementApiContext) as ProviderContext;
};
