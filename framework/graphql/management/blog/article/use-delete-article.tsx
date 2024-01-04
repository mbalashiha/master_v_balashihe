/* eslint-disable react-hooks/rules-of-hooks */
import { useDeleteArticle } from "@common/management/blog/article/use-delete-article";
import { UseDeleteArticle } from "@common/management/blog/article/use-delete-article";
import { API, CMS } from "@common/types";
import { useSearchProvider } from "@components/management/blog/Article";
import { NEXT_PUBLIC_PRODUCTION_SITE_ORIGIN } from "@framework/const";
import { Schema } from "@framework/types";
import {
  normalizeArticle,
  normalizeBlogRow,
} from "@framework/utils/normalize/normalize-article";
import { locale } from "@utils/locale";
import { useSnackbar } from "notistack";
import { deleteArticle } from "./mutations/delete-article";
import useIndexNowRequest from "@framework/management/index-now/use-index-now-request";
export default useDeleteArticle as UseDeleteArticle<typeof handler>;

export interface UseDeleteArticleHook {
  requestInput: { search?: string; id: string | number };
  requestOutput: Schema.Response.DeleteArticleResponse;
  data: {
    success: Boolean;
    message: String;
    error?: string | null;
    articleList?: CMS.Blog.ArticleCard[];
    productionUuidsByIndexNow: {
      [key: string]: Array<{
        uuid: string;
        apiUrl: string;
      }>;
    };
  };
}
export const handler: API.Graphql.MutationHook<UseDeleteArticleHook> = {
  requestOptions: {
    query: deleteArticle,
  },
  async request({ request, options, input }) {
    try {
      const variables = {
        ...input,
        hostOrigin: window?.location?.origin || "",
        NEXT_PUBLIC_PRODUCTION_SITE_ORIGIN,
      };
      const data = await request({ ...options, variables });
      const res = data.deleteArticle;
      const articleList = res.articleList.nodes.map((el) =>
        normalizeBlogRow(el)
      );
      const __productionUuidsByIndexNow =
        res.productionUuidsByIndexNow?.nodes || [];
      const productionUuidsByIndexNow = __productionUuidsByIndexNow.reduce(
        (prev, current, ind, array) => {
          prev[current.apiUrl] = prev[current.apiUrl] || [];
          prev[current.apiUrl].push({ ...current });
          return prev;
        },
        {} as { [key: string]: Array<{ uuid: string; apiUrl: string }> }
      );
      return {
        ...res,
        productionUuidsByIndexNow,
        success: Boolean(res.success),
        articleList,
      };
    } catch (e: any) {
      console.error(e.stack || e.message || e);
      return {
        success: false,
        message: e.stack || e.message || e,
        error: e.stack || e.message || e,
        productionUuidsByIndexNow: {},
      };
    }
  },
  useHook: ({ request }) => {
    const { enqueueSnackbar } = useSnackbar();
    const { updateArticleList, ...ctx } = useSearchProvider();
    const postIndexNow = useIndexNowRequest();
    return () => async (input) => {
      const response = await request(input);
      if (!response.success || !response.articleList) {
        enqueueSnackbar(
          locale(
            (response.message || response.error || "Error occured").substring(
              0,
              312
            )
          ),
          {
            variant: "error",
          }
        );
      } else {
        updateArticleList(
          { search: input.search || "", articles: response.articleList },
          false
        );
      }
      Object.entries(response.productionUuidsByIndexNow).forEach(
        ([apiUrl, nodes]) => {
          if (apiUrl && nodes.length) {
            postIndexNow({ apiUrl, nodes });
          }
        }
      );
      return response;
    };
  },
};
