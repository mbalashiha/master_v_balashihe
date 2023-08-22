/* eslint-disable react-hooks/rules-of-hooks */
import { useArticleSearch } from "@common/management/blog/use-article-search";
import { UseArticleSearch } from "@common/management/blog/use-article-search";
import { API, CMS } from "@common/types";
import { Management } from "@common/types/cms";
import { useSearchProvider } from "@components/management/blog/Article";
import { Schema } from "@framework/types";
import {
  normalizeArticle,
  normalizeBlogRow,
} from "@framework/utils/normalize/normalize-article";
import { useMemo } from "react";
import { managementArticlesCards } from "./queries/management-get-articles-cards";

export default useArticleSearch as UseArticleSearch<typeof handler>;

export interface UseArticleSearchHook {
  requestInput: { search: string };
  requestOutput: Schema.Response.ManagementArticlesCards;
  data: { search: string; articles: CMS.Blog.ArticleCard[] };
}
export const handler: API.Graphql.MutationHook<UseArticleSearchHook> = {
  requestOptions: {
    query: managementArticlesCards,
  },
  async request({ request, options, input }) {
    const data = await request({ ...options, variables: input });
    const { search, nodes } = data.managementArticlesCards;
    const articles = nodes.map((el) => normalizeBlogRow(el));
    return { search: search || "", articles };
  },
  useHook: ({ request }) => {
    const { updateArticleList, ...ctx } = useSearchProvider();
    return () => async (input) => {
      ctx.setSearchQuery(input.search);
      const response = await request(input);
      await updateArticleList(response, false);
      return response;
    };
  },
};
