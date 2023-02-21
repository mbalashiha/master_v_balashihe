import { getConfig } from "@framework/utils";
import { normalizeArticles } from "@framework/utils/normalize";
import { getAllArticlesQuery } from "./queries";

const getAllArticles = async (config?: API.Config): Promise<Blog.Article[]> => {
  config = config || getConfig();
  const data = await config.request<Schema.QueryResponse.BlogArticles>({
    query: getAllArticlesQuery,
  });
  return normalizeArticles(data);
};

export default getAllArticles;
