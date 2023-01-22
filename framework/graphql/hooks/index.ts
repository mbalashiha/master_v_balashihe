import { handler as useSignIn } from "@framework/management/auth/use-sign-in";

export const graphqlHooks = {
  management: {
    auth: {
      useSignIn,
    },
  },
};
