import { API } from "@common/types";
import { Blog } from "@common/types/cms";
import { Schema } from "@framework/types";
import { getConfig } from "@framework/utils";
import { normalizeArticle } from "@framework/utils/normalize";
import { getArticleByHandleQuery } from "./queries";

const getArticleByHandle = async ({
  handle,
}: {
  handle: string;
}): Promise<Blog.Article> => {
  let config = getConfig();
  const data = await config.request<
    { handle: string },
    Schema.Response.ArticleByHandleResponse
  >({
    query: getArticleByHandleQuery,
    variables: { handle },
  });
  return normalizeArticle(data.articleByHandle);
};

export default getArticleByHandle;
