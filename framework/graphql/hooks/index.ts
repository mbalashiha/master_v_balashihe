import { handler as useSignIn } from "@framework/management/auth/use-sign-in";
import { handler as useTokenInfo } from "@framework/management/auth/use-token-info";
import { handler as useTokenOneTime } from "@framework/management/auth/use-token-one-time";
import { handler as useSignOut } from "@framework/management/auth/use-sign-out";
import { handler as useArticleDraft } from "@framework/management/blog/article/draft/use-article-draft";
import { handler as useSaveArticleText } from "@framework/management/blog/article/draft/use-save-article-text";
import { handler as useSaveArticleDraftProps } from "@framework/management/blog/article/draft/use-save-draft-props";
import { handler as useSaveArticle } from "@framework/management/blog/article/use-save-article";
import { handler as useDeleteArticle } from "@framework/management/blog/article/use-delete-article";
import { handler as useDeleteArticleDraft } from "@framework/management/blog/article/draft/use-delete-draft";
import { handler as useArticleList } from "@framework/management/blog/use-article-list";
import { handler as useArticleSearch } from "@framework/management/blog/use-articles-search";
import { API } from "@common/types";

export const graphqlHooks: API.Hooks = {
  management: {
    auth: {
      useSignIn,
      useTokenInfo,
      useTokenOneTime,
      useSignOut,
    },
    blog: {
      useArticleList,
      useArticleSearch,
      article: {
        useSaveArticle,
        useDeleteArticle,
        draft: {
          useArticleDraft,
          useSaveArticleText,
          useSaveDraftProps: useSaveArticleDraftProps,
          useDeleteDraft: useDeleteArticleDraft,
        },
      },
    },
  },
};
