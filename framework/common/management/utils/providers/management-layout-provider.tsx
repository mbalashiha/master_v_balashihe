import { ID, Management } from "@common/types/cms";
import { SnackbarProvider } from "notistack";
import { createContext, useContext, useMemo } from "react";
export interface ManagementLayoutValue {
  manager: {
    friendlyName: string;
    id: ID;
    isAdmin: boolean;
  };
}
export const ManagementLayoutContext = createContext<
  Partial<ManagementLayoutValue>
>({});

interface Props {
  children: React.ReactNode | React.ReactNode[];
  manager?: Management.ManagerTokenResponse["manager"];
}

export const ManagementLayoutProvider = ({ children, manager }: Props) => {
  const providing = useMemo<ManagementLayoutValue>(
    () => ({
      manager: {
        friendlyName: manager?.friendlyName || "",
        id: manager?.id || "",
        isAdmin: manager?.isAdmin || false,
      },
    }),
    [manager?.friendlyName, manager?.id, manager?.isAdmin]
  );
  return (
    <ManagementLayoutContext.Provider value={providing}>
      <SnackbarProvider
        autoHideDuration={8000}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
      >
        {children}
      </SnackbarProvider>
    </ManagementLayoutContext.Provider>
  );
};

export const useManagementLayoutProvider = () => {
  return useContext(ManagementLayoutContext) as ManagementLayoutValue;
};
