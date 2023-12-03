import { API } from "@common/types";
import { Blog } from "@common/types/cms";
import { Schema } from "@framework/types";
import { getConfig } from "@framework/utils";
import { normalizeArticle } from "@framework/utils/normalize/normalize-article";
import { getArticleByHandleQuery } from "./queries";

const getArticleByHandle = async ({
  handle,
  filename,
}: {
  handle: string;
  filename: string;
}): Promise<Blog.Article | null> => {
  let config = getConfig();
  const data = await config.request<
    { handle: string; filename: string },
    Schema.Response.ArticleByHandleResponse
  >({
    query: getArticleByHandleQuery,
    variables: { filename, handle },
  });
  return data.articleByHandle && data.articleByHandle.id
    ? normalizeArticle(data.articleByHandle)
    : null;
};

export default getArticleByHandle;
