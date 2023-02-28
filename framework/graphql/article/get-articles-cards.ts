import { API } from "@common/types";
import { Blog } from "@common/types/cms";
import { Schema } from "@framework/types";
import { getConfig } from "@framework/utils";
import { normalizeBlogRow } from "@framework/utils/normalize";
import { getArticlesCardsQuery } from "./queries";

const getArticlesCards = async (
  config?: API.Config
): Promise<Blog.ArticleCard[]> => {
  config = config || getConfig();
  const data = await config.request<
    void,
    Schema.Response.ArticlesCardsConnection
  >({
    query: getArticlesCardsQuery,
  });
  return data.articlesCards.nodes.map((node) => normalizeBlogRow(node));
};

export default getArticlesCards;
