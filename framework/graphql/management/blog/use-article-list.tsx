/* eslint-disable react-hooks/rules-of-hooks */
import { useArticleList } from "@common/management/blog/use-article-list";
import { UseArticleList } from "@common/management/blog/use-article-list";
import { API, CMS } from "@common/types";
import { Management } from "@common/types/cms";
import { Schema } from "@framework/types";
import { normalizeArticle } from "@framework/utils/normalize";
import { useMemo } from "react";
import { managementGetArticles } from "./queries/get-management-articles";

export default useArticleList as UseArticleList<typeof handler>;

export interface UseArticleListHook {
  requestInput: void;
  requestOutput: Schema.Response.ManagementGetArticles;
  data: CMS.Blog.Article[];
}
export const handler: API.Graphql.SWRHook<UseArticleListHook> = {
  requestOptions: {
    query: managementGetArticles,
  },
  async request({ request, options, input }) {
    const data = await request({ ...options, variables: input });
    return data.managementGetArticles.map((el) => normalizeArticle(el));
  },
  useHook:
    ({ useData }) =>
    (initial) => {
      const { data, isValidating, ...rest } = useData({
        initial,
        swrOptions: {
          revalidateOnFocus: false,
        },
      });
      const isEmpty = !data || !data.length;
      return { data, isEmpty, isValidating, ...rest };
    },
};
