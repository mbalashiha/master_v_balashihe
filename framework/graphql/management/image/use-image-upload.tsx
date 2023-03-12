import { API } from "@common/types";
import { Management } from "@common/types/cms";
import { API_HOST } from "@framework/const";
import { useSnackbar } from "notistack";
import util from "util";
import { useImageUpload } from "@common/management/image/use-image-upload";
import type { UseImageUpload } from "@common/management/image/use-image-upload";

export default useImageUpload as UseImageUpload<typeof handler>;

export interface ImageUploadHook {
  requestInput: {
    file: File;
    name?: string;
  };
  requestOutput: any;
  data: any | undefined;
}
export const handler: API.RestApi.RestApiHook<ImageUploadHook> = {
  options: {
    axios: true,
    url: `${API_HOST}/rest/api/management/upload/image`,
    contentType: "multipart/form-data",
  },
  restRequest: async ({ restRequest, input, options }) => {
    try {
      const formData = new FormData();
      formData.append(input.name || input.file.name, input.file);
      const resp = await restRequest({
        ...options,
        variables: formData,
      });
      return resp;
    } catch (e: any) {
      console.error(e.stack || e.message || e);
      throw e;
    }
  },
  useHook: ({ restRequest }) => {
    const { enqueueSnackbar } = useSnackbar();
    return () => async (input) => {
      try {
        const response = await restRequest(input);
        if (response.error) {
          {
            enqueueSnackbar(response.error.substring(0, 312), {
              variant: "error",
            });
          }
        }
        return response;
      } catch (e: any) {
        {
          enqueueSnackbar(
            (
              e.stack ||
              e.message ||
              util.inspect(e) ||
              "Error occured"
            ).substring(0, 312),
            {
              variant: "error",
            }
          );
        }
      }
    };
  },
};
