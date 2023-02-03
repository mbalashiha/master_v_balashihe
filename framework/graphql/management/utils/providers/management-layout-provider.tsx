import {
  ManagementLayoutProvider as CoreLayoutProvider,
  useManagementLayoutProvider as useCoreLayoutProvider,
} from "@common/management/utils/providers/management-layout-provider";
import useTokenOneTime from "@framework/management/auth/use-token-one-time";

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

export const ManagementLayoutProvider = ({ children }: Props) => {
  const { data: managerTokenInfo, mutate: mutateAuthInfo } = useTokenOneTime();
  return (
    <CoreLayoutProvider manager={managerTokenInfo?.manager} mutateAuthInfo={mutateAuthInfo}>
      {children}
    </CoreLayoutProvider>
  );
};

export const useManagementLayoutProvider = () => {
  return useCoreLayoutProvider();
};
