/* eslint-disable react-hooks/rules-of-hooks */
import { useArticleDraft } from "@common/management/blog/article/draft/use-article-draft";
import { UseArticleDraft } from "@common/management/blog/article/draft/use-article-draft";
import { API, CMS } from "@common/types";
import { Schema } from "@framework/types";
import { useRouter } from "next/router";
import { normalizeArticleDraft } from "./normalize";
import { getArticleDraft } from "./queries/get-article-draft";
import React from "react";

export default useArticleDraft as UseArticleDraft<typeof handler>;

export interface UseArticleDraftHook {
  input: void;
  requestInput: {
    articleId: string | number | null;
    isCreatePage: boolean;
  };
  requestOutput: Schema.Response.GetArticleDraftResponse;
  data: CMS.Blog.ArticleDraft;
}
export const handler: API.Graphql.SWRHook<UseArticleDraftHook> = {
  requestOptions: {
    query: getArticleDraft,
  },
  async request({ request, options, input }) {
    try {
      if (typeof input === "undefined") {
        throw new Error("input can not be undefined in hook use-data request!");
      }
      const { isCreatePage, ...variables } = input;
      const data = await request({ ...options, variables });
      const normalized = normalizeArticleDraft(data.articleDraft);
      return { ...normalized, isCreatePage };
    } catch (e: any) {
      console.error(e);
      throw e;
    }
  },
  useHook: ({ useData }) => {
    const router = useRouter();
    const isCreatePage = React.useMemo<boolean>(() => {
      return router.pathname.endsWith("/article/create");
    }, [router.pathname]);
    const isReady = isCreatePage ? true : router.isReady;
    const articleId =
      (router.query.articleId &&
        (Array.isArray(router.query.articleId)
          ? router.query.articleId[0]
          : router.query.articleId)) ||
      null;
    return (initial) => {
      const { data, isValidating, ...rest } = useData({
        isReady,
        variables: {
          isCreatePage,
          articleId,
        },
        swrOptions: {
          ...initial?.swrOptions,
          revalidateOnFocus: false,
          revalidateOnReconnect: false,
          focusThrottleInterval: 8 * 60 * 1000,
        },
      });
      const isEmpty = !data;
      return {
        data,
        isValidating,
        isEmpty,
        ...rest,
      };
    };
  },
};
