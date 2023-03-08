import { API } from "@common/types";
import { Blog } from "@common/types/cms";
import { Schema } from "@framework/types";
import { getConfig } from "@framework/utils";
import { normalizeArticles } from "@framework/utils/normalize/article";
import { getArticlesPathesQuery } from "./queries";

const getArticlesPathes = async (
  config?: API.Config
): Promise<Array<{ params: { slug: string } }>> => {
  config = config || getConfig();
  const data = await config.request<
    void,
    Schema.Response.ArticlesPathesResponse
  >({
    query: getArticlesPathesQuery,
  });
  return data.articlesPathes.nodes.map((handle) => ({
    params: { slug: handle.handle },
  }));
};

export default getArticlesPathes;
