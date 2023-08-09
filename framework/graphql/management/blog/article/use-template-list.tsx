/* eslint-disable react-hooks/rules-of-hooks */
import { useTemplateList } from "@common/management/blog/article/use-template-list";
import { UseTemplateList } from "@common/management/blog/article/use-template-list";
import { API, CMS } from "@common/types";
import { Schema } from "@framework/types";
import {
  normalizeBlogRow,
} from "@framework/utils/normalize/normalize-article";
import { managementArticleTemplates } from "./query-article-template-list";

export default useTemplateList as UseTemplateList<typeof handler>;

export interface UseTemplateListHook {
  input: undefined;
  requestInput: { search?: string } | undefined;
  requestOutput: Schema.Response.ManagementArticlesCards;
  data: { search: string; articles: CMS.Blog.ArticleCard[] };
}
export const handler: API.Graphql.SWRHook<UseTemplateListHook> = {
  requestOptions: {
    query: managementArticleTemplates,
  },
  async request({ request, options, input }) {
    const data = await request({ ...options, variables: input });
    const { search, nodes } = data.managementArticlesCards;
    const articles = nodes.map((el) => normalizeBlogRow(el));
    return { search: search || "", articles };
  },
  useHook: ({ useData }) => {
    return () => {
      const { data, isValidating, error, ...rest } = useData({
        swrOptions: {
          revalidateOnFocus: false,
        },
      });
      const isEmpty = !data || !data.articles?.length;
      return { data, isEmpty, isValidating, error, ...rest };
    };
  },
};
