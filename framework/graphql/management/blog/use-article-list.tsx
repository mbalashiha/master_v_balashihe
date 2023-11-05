/* eslint-disable react-hooks/rules-of-hooks */
import { useArticleList } from "@common/management/blog/use-article-list";
import { UseArticleList } from "@common/management/blog/use-article-list";
import { API, CMS } from "@common/types";
import { useSearchProvider } from "@components/management/blog/Article";
import { Schema } from "@framework/types";
import {
  normalizeBlogRow,
} from "@framework/utils/normalize/normalize-article";
import { useSnackbar } from "notistack";
import { managementArticlesCards } from "./queries/management-get-articles-cards";
import util from "util";

export default useArticleList as UseArticleList<typeof handler>;

export interface UseArticleListHook {
  input: undefined;
  requestInput: { search?: string | null } | undefined;
  requestOutput: Schema.Response.ManagementArticlesCards;
  data: { search: string; articles: CMS.Blog.ArticleCard[] };
}
export const handler: API.Graphql.SWRHook<UseArticleListHook> = {
  requestOptions: {
    query: managementArticlesCards,
  },
  swrKey: managementArticlesCards,
  async request({ request, options, input }) {
    const data = await request({ ...options, variables: input });
    const { search, nodes } = data.managementArticlesCards;
    const articles = nodes.map((el) => normalizeBlogRow(el));
    return { search: search || "", articles };
  },
  useHook: ({ useData }) => {
    const ctx = useSearchProvider();
    return (initial) => {
      if (!initial?.swrOptions?.fallbackData) {
        throw new Error("There should be initial value fallbackData!");
      }
      const search = ctx?.search || "";
      const { data, isValidating, error, ...rest } = useData({
        variables: {
          search,
        },
        swrOptions: {
          revalidateOnFocus: false,
          ...initial?.swrOptions,
        },
      });
      const isEmpty = !data || !data.articles?.length;
      return { data, isEmpty, isValidating, error, ...rest };
    };
  },
};
