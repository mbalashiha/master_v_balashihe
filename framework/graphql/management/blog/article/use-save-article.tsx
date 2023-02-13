/* eslint-disable react-hooks/rules-of-hooks */
import { useSaveArticle } from "@common/management/blog/article/use-save-article";
import { UseSaveArticle } from "@common/management/blog/article/use-save-article";
import { API } from "@common/types";
import { Schema } from "@framework/types";
import { slugify } from "lib";
import { useSnackbar } from "notistack";
import { saveArticle } from "./mutations/save-article";
export default useSaveArticle as UseSaveArticle<typeof handler>;

export interface UseSaveArticleHook {
  requestInput: { article: Schema.Article.ArticleInput };
  requestOutput: Schema.Response.SaveArticleResponse;
  data: Schema.Response.SaveArticleResponse["saveArticle"];
}
export const handler: API.Graphql.MutationHook<UseSaveArticleHook> = {
  requestOptions: {
    query: saveArticle,
  },
  async request({ request, options, input }) {
    try {
      const variables = input;
      const data = await request({ ...options, variables });
      return data.saveArticle;
    } catch (e: any) {
      console.error(e.stack || e.message || e);
      return {
        success: false,
        message: e.stack || e.message || e,
        error: e.stack || e.message || e,
      };
    }
  },
  useHook: ({ request }) => {
    const { enqueueSnackbar } = useSnackbar();
    return () => async (input) => {
      const response = await request(input);
      enqueueSnackbar(
        (response.message || response.error || "Error occured").substring(
          0,
          512
        )
      );
      return response;
    };
  },
};
