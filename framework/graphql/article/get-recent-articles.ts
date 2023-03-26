import { API } from "@common/types";
import { Blog } from "@common/types/cms";
import { Schema } from "@framework/types";
import { getConfig } from "@framework/utils";
import { normalizeBlogRow } from "@framework/utils/normalize/article";
import { normalizeArtNavItem } from "@framework/utils/normalize";
import { getRecentArticlesQuery } from "./queries";
import { shuffle } from "@lib";

const getRecentArticles = async (
  { search }: { search: string } = { search: "" },
  config?: API.Config
): Promise<Blog.NavigationItem[]> => {
  config = config || getConfig();
  const data = await config.request<
    { search: string },
    Schema.Response.ArticlesCardsConnection
  >({
    query: getRecentArticlesQuery,
    variables: { search: (search || "").trim() },
  });
  return shuffle(
    data.articlesCards.nodes.map((el) =>
      normalizeArtNavItem({
        handle: el.handle,
        title: el.title,
        itIsloop: false,
      })
    )
  );
};

export default getRecentArticles;
