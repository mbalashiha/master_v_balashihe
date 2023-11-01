import {
  ManagementLayoutProvider as CoreLayoutProvider,
  useManagementLayoutProvider as useCoreLayoutProvider,
} from "@common/management/utils/providers/management-layout-provider";
import useTokenOneTime from "@framework/management/auth/use-token-one-time";
import { useCallback, useEffect, useRef } from "react";

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

export const ManagementLayoutProvider = ({ children }: Props) => {
  const { data: managerTokenInfo, mutate: origMutateAuthInfo } =
    useTokenOneTime();
  const mutateRef = useRef({ mutateAuthInfo: origMutateAuthInfo });
  useEffect(() => {
    mutateRef.current = {
      ...mutateRef.current,
      mutateAuthInfo: origMutateAuthInfo,
    };
  }, [origMutateAuthInfo]);
  const mutateAuthInfo: typeof mutateRef.current.mutateAuthInfo = useCallback(
    (...args) => {
      return mutateRef.current.mutateAuthInfo(...args);
    },
    []
  );
  return (
    <CoreLayoutProvider
      manager={managerTokenInfo?.manager}
      mutateAuthInfo={mutateAuthInfo}
    >
      {children}
    </CoreLayoutProvider>
  );
};

export const useManagementLayoutProvider = () => {
  return useCoreLayoutProvider();
};
