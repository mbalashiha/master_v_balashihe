import { createContext, useContext, useMemo } from "react";
export const ManagementApiContext = createContext({});

interface Props {
  children: React.ReactNode | React.ReactNode[];
  config: API.Config;
}

export const ManagementApiProvider = ({ children, config }: Props) => {
  const coreConfig = useMemo(
    () => ({
      request: config.request,
      restApi: config.restApi,
    }),
    [config.request, config.restApi]
  );
  return (
    <ManagementApiContext.Provider value={coreConfig}>
      {children}
    </ManagementApiContext.Provider>
  );
};

export const useManagementApiProvider = () => {
  return useContext(ManagementApiContext);
};
