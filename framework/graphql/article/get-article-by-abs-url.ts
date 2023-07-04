import { API } from "@common/types";
import { Blog } from "@common/types/cms";
import { Schema } from "@framework/types";
import { getConfig } from "@framework/utils";
import { normalizeArticle } from "@framework/utils/normalize/normalize-article";
import { getArticleByAbsUrlQuery } from "./queries";

export const getArticleByAbsUrl = async ({
  absURL,
}: {
  absURL: string;
}): Promise<Blog.Article | null> => {
  let config = getConfig();
  const data = await config.request<
    { absURL: string },
    Schema.Response.ArticleByAbsUrlResponse
  >({
    query: getArticleByAbsUrlQuery,
    variables: { absURL },
  });
  return data.articleByAbsUrl ? normalizeArticle(data.articleByAbsUrl) : null;
};

export default getArticleByAbsUrl;
