import { createContext, useContext, useMemo } from "react";
import { getConfig } from "@framework/utils";
import { graphqlHooks } from "./hooks";

import {
  ApiProvider as CoreApiProvider,
  useApiProvider as useCoreApiProvider,
} from "@common/index";
interface Props {
  children: React.ReactNode | React.ReactNode[];
}

export const ApiProvider = ({ children }: Props) => {
  const config = useMemo(() => getConfig(), []);
  return (
    <CoreApiProvider config={config} hooks={graphqlHooks}>
      {children}
    </CoreApiProvider>
  );
};

export const useManagementApiProvider = () => {
  return useCoreApiProvider();
};
