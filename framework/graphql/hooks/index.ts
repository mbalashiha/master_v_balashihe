import { handler as useSignIn } from "@framework/management/auth/use-sign-in";
import { handler as useTokenInfo } from "@framework/management/auth/use-token-info";

export const graphqlHooks = {
  management: {
    auth: {
      useSignIn,
      useTokenInfo,
    },
  },
};
