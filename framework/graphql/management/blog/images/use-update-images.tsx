/* eslint-disable react-hooks/rules-of-hooks */
import { useUpdateImages } from "@common/management/blog/images/use-update-images";
import type { UseUpdateImages } from "@common/management/blog/images/use-update-images";
import { API, CMS } from "@common/types";
import { Schema } from "@framework/types";
import { normalizeImage } from "@framework/utils/normalize/normalize-article";
import { useSnackbar } from "notistack";
import { updateImageMetadata } from "@framework/management/mutations/updateImageMetadata";
export default useUpdateImages as UseUpdateImages<typeof handler>;

export interface useUpdateImagesHook {
  requestInput: Schema.ImageArrayInput;
  requestOutput: Schema.Response.UpdatedImagesResponse;
  data: CMS.Image[];
}
export const handler: API.Graphql.MutationHook<useUpdateImagesHook> = {
  requestOptions: {
    query: updateImageMetadata,
  },
  async request({ request, options, input }) {
    try {
      const variables = { input };
      const data = await request({ ...options, variables });
      const res = data.updateImageMetadata;
      const images = res.images.map((img) => normalizeImage(img));
      return images;
    } catch (e: any) {
      console.error(e.stack || e.message || e);
      throw e;
    }
  },
  useHook: ({ request }) => {
    const { enqueueSnackbar } = useSnackbar();
    return () => async (input) => {
      const response = await request(input);
      // enqueueSnackbar(
      //   locale(
      //     (response.message || response.error || "Error occured").substring(
      //       0,
      //       312
      //     )
      //   ),
      //   {
      //     variant: "error",
      //   }
      // );
      return response;
    };
  },
};
