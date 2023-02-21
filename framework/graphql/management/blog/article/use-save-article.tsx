/* eslint-disable react-hooks/rules-of-hooks */
import { useSaveArticle } from "@common/management/blog/article/use-save-article";
import { UseSaveArticle } from "@common/management/blog/article/use-save-article";
import { API, CMS } from "@common/types";
import { ID, Schema } from "@framework/types";
import { slugify } from "lib";
import { useSnackbar } from "notistack";
import { normalize } from "path";
import { normalizeArticleDraft } from "./draft/normalize";
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
      const variables = input;
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
