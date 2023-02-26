/* eslint-disable react-hooks/rules-of-hooks */
import { useManagementApiProvider } from "@common/management";
import { useArticleDraft } from "@common/management/blog/article/draft/use-article-draft";
import { UseArticleDraft } from "@common/management/blog/article/draft/use-article-draft";
import { API, CMS } from "@common/types";
import { Management } from "@common/types/cms";
import { useRefFormik } from "@components/ui";
import { Schema } from "@framework/types";
import { useRouter } from "next/router";
import { normalizeArticleDraft } from "./normalize";
import { getArticleDraft } from "./queries/get-article-draft";

export default useArticleDraft as UseArticleDraft<typeof handler>;

export interface UseArticleDraftHook {
  requestInput: Partial<{ articleId: string | number | null }>;
  requestOutput: Schema.Response.GetArticleDraftResponse;
  data: CMS.Blog.ArticleDraft;
}
export const handler: API.Graphql.SWRHook<UseArticleDraftHook> = {
  requestOptions: {
    query: getArticleDraft,
  },
  async request({ request, options, input }) {
    try {
      const data = await request({ ...options, variables: input });
      const normalized = normalizeArticleDraft(data.articleDraft);
      return normalized;
    } catch (e: any) {
      console.error(e);
      throw e;
    }
  },
  useHook: ({ useData }) => {
    return (initial) => {
      const { data, isValidating, ...rest } = useData({
        ...initial,
        swrOptions: {
          ...initial?.swrOptions,
          revalidateOnFocus: false,
          revalidateOnReconnect: false,
          focusThrottleInterval: 8 * 60 * 1000,
        },
      });
      const isEmpty = !data || !data.id;
      return {
        data,
        isValidating,
        isEmpty,
        ...rest,
      };
    };
  },
};
