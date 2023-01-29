import { handler as useSignIn } from "@framework/management/auth/use-sign-in";
import { handler as useTokenInfo } from "@framework/management/auth/use-token-info";
import { handler as useTokenOneTime } from "@framework/management/auth/use-token-one-time";

export const graphqlHooks = {
  management: {
    auth: {
      useSignIn,
      useTokenInfo,
      useTokenOneTime,
    },
  },
};
