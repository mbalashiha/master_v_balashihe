import { Management } from "@common/types/cms";
import { ID } from "@framework/types";
import { createContext, useContext, useEffect, useMemo, useRef } from "react";
import { KeyedMutator } from "swr";
import { parseArgs } from "util";
export interface ManagementLayoutValue {
  manager: {
    friendlyName: string;
    id: ID;
    isAdmin: boolean;
  };
  mutateAuthInfo: KeyedMutator<Management.ManagerTokenResponse>;
}
export const ManagementLayoutContext = createContext<
  Partial<ManagementLayoutValue>
>({});

interface Props {
  children: React.ReactNode | React.ReactNode[];
  manager?: Management.ManagerTokenResponse["manager"];
  mutateAuthInfo: KeyedMutator<Management.ManagerTokenResponse>;
}

export const ManagementLayoutProvider = ({
  children,
  manager,
  mutateAuthInfo,
}: Props) => {
  const providing = useMemo(() => {
    return {
      manager: {
        friendlyName: manager?.friendlyName || "",
        id: manager?.id || "",
        isAdmin: manager?.isAdmin || false,
      },
      mutateAuthInfo,
    };
  }, [mutateAuthInfo, manager?.friendlyName, manager?.id, manager?.isAdmin]);
  return (
    <ManagementLayoutContext.Provider value={providing}>
      {children}
    </ManagementLayoutContext.Provider>
  );
};

export const useManagementLayoutProvider = () => {
  return useContext(ManagementLayoutContext) as ManagementLayoutValue;
};
