import { createContext, useContext } from "react";
import { getConfig } from "@framework/utils";
import { graphqlHooks } from "@framework/hooks";

import {
  ManagementApiProvider as CoreApiProvider,
  useManagementApiProvider as useCoreApiProvider,
} from "@common/management";

interface Props {
  children: React.ReactNode | React.ReactNode[];
}
const config = getConfig();

export const ManagementApiProvider = ({ children }: Props) => {
  return <CoreApiProvider config={config} hooks={graphqlHooks}>{children}</CoreApiProvider>;
};

export const useManagementApiProvider = () => {
  return useCoreApiProvider();
};
