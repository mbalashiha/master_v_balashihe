import { API } from "@common/types";
import { Blog } from "@common/types/cms";
import { Schema } from "@framework/types";
import { getConfig } from "@framework/utils";
import { normalizeArticles } from "@framework/utils/normalize/normalize-article";
import { getAllArticlesQuery } from "./queries";

const getAllArticles = async (config?: API.Config): Promise<Blog.Article[]> => {
  config = config || getConfig();
  const data = await config.request<void, Schema.Response.BlogArticles>({
    query: getAllArticlesQuery,
  });
  return normalizeArticles(data);
};

export default getAllArticles;
