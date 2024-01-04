import { API } from "@common/types";
import { Blog } from "@common/types/cms";
import { Schema } from "@framework/types";
import { getConfig } from "@framework/utils";
import util from "util";
import { getNextjsRevalidateUrlsMutation } from "./nextjs_revalidate_module_mutation";

export const getNextjsRevalidateUrls = async ({
  uuids,
  secret,
}: {
  uuids: string[];
  secret: string;
}): Promise<string[]> => {
  const config = getConfig();
  const data = await config.request<
    {
      uuids: string[];
      secret: string;
    },
    {
      getNextjsRevalidateUrls: {
        urls: string[];
      };
    }
  >({
    query: getNextjsRevalidateUrlsMutation,
    variables: { uuids, secret },
  });
  return data.getNextjsRevalidateUrls.urls;
};

export default getNextjsRevalidateUrls;
