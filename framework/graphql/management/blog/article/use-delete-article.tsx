/* eslint-disable react-hooks/rules-of-hooks */
import { useDeleteArticle } from "@common/management/blog/article/use-delete-article";
import { UseDeleteArticle } from "@common/management/blog/article/use-delete-article";
import { API, CMS } from "@common/types";
import { Schema } from "@framework/types";
import { normalizeArticle } from "@framework/utils/normalize";
import { slugify } from "lib";
import { useSnackbar } from "notistack";
import useArticleList from "../use-article-list";
import { deleteArticle } from "./mutations/delete-article";
export default useDeleteArticle as UseDeleteArticle<typeof handler>;

export interface UseDeleteArticleHook {
  requestInput: { id: string | number };
  requestOutput: Schema.Response.DeleteArticleResponse;
  data: {
    success: Boolean;
    message: String;
    error?: string | null;
    articleList?: CMS.Blog.Article[];
  };
}
export const handler: API.Graphql.MutationHook<UseDeleteArticleHook> = {
  requestOptions: {
    query: deleteArticle,
  },
  async request({ request, options, input }) {
    try {
      const variables = input;
      const data = await request({ ...options, variables });
      const res = data.deleteArticle;
      const articleList = res.articleList.map((el) => normalizeArticle(el));
      return { ...res, success: Boolean(res.success), articleList };
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
    const { mutate: updateArticleList } = useArticleList();
    return () => async (input) => {
      const response = await request(input);
      if (!response.success || !response.articleList) {
        enqueueSnackbar(
          (response.message || response.error || "Error occured").substring(
            0,
            312
          ),
          {
            variant: "error",
          }
        );
      } else {
        updateArticleList(response.articleList, false);
      }
      return response;
    };
  },
};
