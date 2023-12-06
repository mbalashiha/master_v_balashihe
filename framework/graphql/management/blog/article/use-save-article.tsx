/* eslint-disable react-hooks/rules-of-hooks */
import { useSaveArticle } from "@common/management/blog/article/use-save-article";
import { UseSaveArticle } from "@common/management/blog/article/use-save-article";
import { API, CMS } from "@common/types";
import { ID, Schema } from "@framework/types";
import { locale } from "@utils/locale";
import { slugify } from "lib";
import { useSnackbar } from "notistack";
import { normalize } from "path";
import { normalizeArticleDraft } from "../../../utils/normalize/normalize-article-draft";
import useArticleDraft from "./draft/use-article-draft";
import { saveArticle } from "./mutations/save-article";
export default useSaveArticle as UseSaveArticle<typeof handler>;

export interface UseSaveArticleHook {
  requestInput: { article: Schema.Article.ArticleInput };
  requestOutput: Schema.Response.SaveArticleResponse;
  data: {
    articleId: ID | null;
    success: Boolean;
    message: String;
    error?: string | null;
    articleDraft: CMS.Blog.ArticleDraft;
  };
}
export const handler: API.Graphql.MutationHook<UseSaveArticleHook> = {
  requestOptions: {
    query: saveArticle,
  },
  async request({ request, options, input }) {
    try {
      const variables = {
        ...input,
        hostOrigin: window?.location?.origin || "",
      };
      const data = await request({ ...options, variables });
      const res = data.saveArticle;
      return {
        ...res,
        articleDraft: normalizeArticleDraft(res.articleDraft),
      };
    } catch (e: any) {
      console.error(e.stack || e.message || e);
      throw {
        success: false,
        message: e.stack || e.message || e,
        stack: e.stack,
        error: e.stack || e.message || e,
        articleId: null,
      };
    }
  },
  useHook: ({ request }) => {
    const { enqueueSnackbar } = useSnackbar();
    const { mutate: updateDraft } = useArticleDraft();
    return () => async (input) => {
      try {
        const response = await request(input);
        if (response.message) {
          response.message = locale(response.message as any);
        }
        if (response.error) {
          const m = response.error.match(
            /\s*ER_DUP_ENTRY\:\s+Duplicate entry\s+'([^\'\"]+)'/im
          );
          if (m && m[1]) {
            const duplicateTitle = m[1];
            response.error = `Статья и именем "${duplicateTitle}" уже существует. Перейти к редактированию существующей статьи?`;
          }
        }
        enqueueSnackbar(
          (response.message || response.error || "Error occured").substring(
            0,
            312
          ),
          (response.error && {
            variant: "error",
          }) ||
            undefined
        );
        await updateDraft(response.articleDraft, false);
        return response;
      } catch (e: any) {
        enqueueSnackbar(
          (e.message || e.error || "Error occured").substring(0, 312),
          {
            variant: "error",
          }
        );
        throw e;
      }
    };
  },
};
