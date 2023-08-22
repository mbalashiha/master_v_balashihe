import { API, CMS } from "@common/types";
import { Blog } from "@common/types/cms";
import { ID, Schema } from "@framework/types";
import { getConfig } from "@framework/utils";
import {
  normalizeArticles,
  normalizeBlogRow,
} from "@framework/utils/normalize/normalize-article";
import { normalizeArticleDraft } from "@framework/utils/normalize/normalize-article-draft";
import ServerSideApi from "@framework/utils/server-side-api";
import { GetServerSidePropsContext } from "next/types";
import util from "util";
import { managementArticlesCards } from "./management-get-articles-cards";

interface Input {
  search?: string | null;
}
const getArticlesCardsProps = async (
  { search: inSearch }: Input,
  ctx: GetServerSidePropsContext
): Promise<{ search: string; articles: CMS.Blog.ArticleCard[] }> => {
  const config = new ServerSideApi(ctx);
  const data = await config.request<
    Input,
    Schema.Response.ManagementArticlesCards
  >({
    query: managementArticlesCards,
    variables: { search: inSearch },
  });
  const { search, nodes } = data.managementArticlesCards;
  const articles = nodes.map((el) => normalizeBlogRow(el));
  return { search: search || "", articles };
};

export default getArticlesCardsProps;
