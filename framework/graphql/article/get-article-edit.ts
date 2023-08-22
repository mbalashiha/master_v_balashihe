import { API } from "@common/types";
import { Blog } from "@common/types/cms";
import { ID, Schema } from "@framework/types";
import { getConfig } from "@framework/utils";
import { normalizeArticles } from "@framework/utils/normalize/normalize-article";
import { normalizeArticleDraft } from "@framework/utils/normalize/normalize-article-draft";
import ServerSideApi from "@framework/utils/server-side-api";
import { GetServerSidePropsContext } from "next/types";
import { getArticleEditQuery } from "./queries";
import util from "util";

interface Input {
  articleId: ID | null;
}
const getArticleEdit = async (
  { articleId }: Input,
  ctx: GetServerSidePropsContext
): Promise<Blog.ArticleDraft> => {
  const config = new ServerSideApi(ctx);
  const data = await config.request<
    Input,
    {
      articleDraft: Schema.Article.ArticleDraft;
    }
  >({
    query: getArticleEditQuery,
    variables: { articleId },
  });
  return normalizeArticleDraft(data.articleDraft);
};

export default getArticleEdit;
