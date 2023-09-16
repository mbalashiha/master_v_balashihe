import { API } from "@common/types";
import { Blog } from "@common/types/cms";
import { Schema } from "@framework/types";
import { getConfig } from "@framework/utils";
import { normalizeArtNavItem } from "@framework/utils/normalize";
import { shuffle } from "@lib";
import { getRecentArticlesQuery } from "./queries/get-recent-articles-query";

const getRecentArticles = async (
  { search }: { search: string } = { search: "" },
  config?: API.Config
): Promise<Blog.NavigationItem[]> => {
  config = config || getConfig();
  const data = await config.request<
    { search: string },
    Schema.Response.RecentArticlesConnection
  >({
    query: getRecentArticlesQuery,
    variables: { search: (search || "").trim() },
  });
  return shuffle(
    data.recentArticles.nodes.map((el) =>
      normalizeArtNavItem({
        handle: el.handle,
        title: el.title,
        itIsloop: false,
        image: el.image,
      })
    )
  );
};

export default getRecentArticles;
