import { API, CMS } from "@common/types";
import { Blog } from "@common/types/cms";
import { Schema } from "@framework/types";
import { getConfig } from "@framework/utils";
import { normalizeImage } from "@framework/utils/normalize";
import { getTickerImagesQuery } from "./queries/ticker-images-query";

const getTickerImages = async (config?: API.Config): Promise<CMS.Image[]> => {
  config = config || getConfig();
  const data = await config.request<void, Schema.Response.TickerImages>({
    query: getTickerImagesQuery,
  });
  return data.getTickerImages.map((el) => normalizeImage(el));
};

export default getTickerImages;
