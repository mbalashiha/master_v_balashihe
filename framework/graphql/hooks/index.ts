import { handler as useSignIn } from "@framework/management/auth/use-sign-in";
import { handler as useTokenInfo } from "@framework/management/auth/use-token-info";
import { handler as useTokenOneTime } from "@framework/management/auth/use-token-one-time";
import { handler as useSignOut } from "@framework/management/auth/use-sign-out";
import { handler as useArticleDraft } from "@framework/management/blog/draft/use-article-draft";
import { handler as useSaveArticleText } from "@framework/management/blog/draft/use-save-article-text";

export const graphqlHooks = {
  management: {
    auth: {
      useSignIn,
      useTokenInfo,
      useTokenOneTime,
      useSignOut,
    },
    blog: {
      useArticleDraft,
      useSaveArticleText,
    },
  },
};
