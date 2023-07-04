/* eslint-disable react-hooks/rules-of-hooks */
import { useCheckArticle } from "@common/management/blog/article/draft/use-check-article";
import { UseCheckArticle } from "@common/management/blog/article/draft/use-check-article";
import { API, CMS } from "@common/types";
import { Management } from "@common/types/cms";
import { useSearchProvider } from "@components/management/blog/Article";
import { Schema } from "@framework/types";
import {
  normalizeArticle,
  normalizeBlogRow,
} from "@framework/utils/normalize/normalize-article";
import { useMemo } from "react";
import { managementCheckArticleQuery } from "./queries/check-article-with-same-name";

export default useCheckArticle as UseCheckArticle<typeof handler>;

export interface UseCheckArticleHook {
  requestInput: { title: string; handle: string };
  requestOutput: Schema.Response.ManagementCheckArticle;
  data: CMS.Blog.Article | undefined;
}
export const handler: API.Graphql.MutationHook<UseCheckArticleHook> = {
  requestOptions: {
    query: managementCheckArticleQuery,
  },
  async request({ request, options, input }) {
    const data = await request({ ...options, variables: input });
    const article = data.managementCheckArticle;
    if (article) {
      return normalizeArticle(article);
    }
  },
  useHook: ({ request }) => {
    return () => async (input) => {
      const response = await request(input);
      return response;
    };
  },
};
