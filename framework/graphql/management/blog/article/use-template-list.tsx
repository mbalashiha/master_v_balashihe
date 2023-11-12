/* eslint-disable react-hooks/rules-of-hooks */
import { useTemplateList } from "@common/management/blog/article/use-template-list";
import { UseTemplateList } from "@common/management/blog/article/use-template-list";
import { API, CMS } from "@common/types";
import { Schema } from "@framework/types";
import { normalizeBlogRow } from "@framework/utils/normalize/normalize-article";
import { managementArticleTemplates } from "./query-article-template-list";

export default useTemplateList as UseTemplateList<typeof handler>;

export interface UseTemplateListHook {
  input: undefined;
  requestInput: undefined;
  requestOutput: Schema.Response.ManagementArticleTemplates;
  data: CMS.Blog.ArticleTemplate[];
}
export const handler: API.Graphql.SWRHook<UseTemplateListHook> = {
  requestOptions: {
    query: managementArticleTemplates,
  },
  async request({ request, options, input }) {
    const data = await request({ ...options, variables: input });
    const templates = data.managementArticleTemplates;
    return templates;
  },
  useHook: ({ useData }) => {
    return (initial) => {
      const { data, ...rest } = useData({
        swrOptions: {
          revalidateOnFocus: false,
          ...initial?.swrOptions,
        },
      });
      const isEmpty = Boolean(data?.length);
      return { data, isEmpty, ...rest };
    };
  },
};
