import useFromLogin from "@common/management/utils/hooks/use-from-login";
import { API } from "@common/types";
import { ID, Management } from "@common/types/cms";
import useTokenInfo from "@framework/management/auth/use-token-info";
import { createContext, useContext, useMemo } from "react";

export interface LoginValue {
  authData: API.Graphql.ModSWRResponse<Management.ManagerTokenResponse>;
  doRedirectAuthorized: () => Promise<void>;
}
export const LoginContext = createContext<Partial<LoginValue>>({});

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

export const LoginProvider = ({ children }: Props) => {
  const authData = useTokenInfo();
  const { doRedirectAuthorized } = useFromLogin();
  return (
    <LoginContext.Provider value={{ authData, doRedirectAuthorized }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLoginProvider = () => {
  return useContext(LoginContext) as LoginValue;
};
