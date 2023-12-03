import { API } from "@common/types";
import { Blog } from "@common/types/cms";
import { Schema } from "@framework/types";
import { getConfig } from "@framework/utils";
import { getArticlesPathesQuery } from "./queries";
import util from "util";

const getArticlesPathes = async ({
  filename,
}: {
  filename: string;
}): Promise<Array<{ params: { slug: string[] } }>> => {
  const config = getConfig();
  const data = await config.request<
    { filename: string },
    Schema.Response.ArticlesPathesResponse
  >({
    query: getArticlesPathesQuery,
    variables: { filename },
  });
  return data.articlesPathes.nodes.map((handle) => ({
    params: { slug: handle.handle.split("/") },
  }));
};

export default getArticlesPathes;
