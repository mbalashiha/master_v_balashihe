import { API } from "@common/types";
import React from "react";
import { createContext, useContext, useMemo } from "react";
type ProviderContext = API.ApiProviderContext<API.SiteHooks>;
export const ApiContext = createContext<Partial<ProviderContext>>({});

interface Props {
  children: React.ReactNode | React.ReactNode[];
  config: API.Config;
  hooks: API.SiteHooks;
}

export const ApiProvider = ({ children, config, hooks }: Props) => {
  const coreConfig = {
    request: config.request,
    restRequest: config.restRequest,
    hooks,
  };
  return (
    <ApiContext.Provider value={coreConfig}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApiProvider = () => {
  return useContext(ApiContext) as ProviderContext;
};
