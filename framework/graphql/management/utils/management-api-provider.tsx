import { createContext, useContext, useMemo } from "react";
import { getConfig } from "@framework/utils";
import { graphqlHooks } from "@framework/management/hooks";

import {
  ManagementApiProvider as CoreApiProvider,
  useManagementApiProvider as useCoreApiProvider,
} from "@common/management";
import useLoginRoute from "@common/management/utils/hooks/use-login-route";

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

export const ManagementApiProvider = ({ children }: Props) => {
  const { toLoginPage } = useLoginRoute();
  const config = useMemo(() => getConfig({ toLoginPage }), [toLoginPage]);
  return (
    <CoreApiProvider config={config} hooks={graphqlHooks}>
      {children}
    </CoreApiProvider>
  );
};

export const useManagementApiProvider = () => {
  return useCoreApiProvider();
};
