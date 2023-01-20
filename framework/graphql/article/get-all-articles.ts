import { fetchApi } from "@framework/utils";
import { normalizeArticles } from "@framework/utils/normalize";
import { getAllArticlesQuery } from "./queries";

const getAllArticles = async (): Promise<Blog.Article[]> => {
  const data = await fetchApi<Schema.QueryResponse.BlogArticles>({
    query: getAllArticlesQuery,
  });
  return normalizeArticles(data);
};

export default getAllArticles;
