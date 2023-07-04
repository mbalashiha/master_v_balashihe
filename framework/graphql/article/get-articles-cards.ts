import { API } from "@common/types";
import { Blog } from "@common/types/cms";
import { Schema } from "@framework/types";
import { getConfig } from "@framework/utils";
import { normalizeBlogRow } from "@framework/utils/normalize/normalize-article";
import { getArticlesCardsQuery } from "./queries";

const getArticlesCards = async (
  { search }: { search: string } = { search: "" },
  config?: API.Config
): Promise<Blog.ArticleCard[]> => {
  config = config || getConfig();
  const data = await config.request<
    { search: string },
    Schema.Response.ArticlesCardsConnection
  >({
    query: getArticlesCardsQuery,
    variables: { search: (search || "").trim() },
  });
  return data.articlesCards.nodes.map((node) => normalizeBlogRow(node));
};

export default getArticlesCards;
