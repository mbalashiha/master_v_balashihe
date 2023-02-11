import { handler as useSignIn } from "@framework/management/auth/use-sign-in";
import { handler as useTokenInfo } from "@framework/management/auth/use-token-info";
import { handler as useTokenOneTime } from "@framework/management/auth/use-token-one-time";
import { handler as useSignOut } from "@framework/management/auth/use-sign-out";
import { handler as useArticleDraft } from "@framework/management/blog/article/draft/use-article-draft";
import { handler as useSaveArticleText } from "@framework/management/blog/article/draft/use-save-article-text";
import { handler as useSaveArticleDraftProps } from "@framework/management/blog/article/draft/use-save-draft-props";

export const graphqlHooks = {
  management: {
    auth: {
      useSignIn,
      useTokenInfo,
      useTokenOneTime,
      useSignOut,
    },
    blog: {
      article: {
        draft: {
          useArticleDraft,
          useSaveArticleText,
          useSaveDraftProps: useSaveArticleDraftProps,
        },
      },
    },
  },
};
