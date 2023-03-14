import { API } from "@common/types";
import { Management } from "@common/types/cms";
import { API_HOST } from "@framework/const";
import { useSnackbar } from "notistack";
import util from "util";
import { useImageUpload } from "@common/management/image/use-image-upload";
import type { UseImageUpload } from "@common/management/image/use-image-upload";
import { slugify } from "@lib";

export default useImageUpload as UseImageUpload<typeof handler>;

export interface ImageUploadHook {
  requestInput: {
    file: File;
    name?: string;
    extension?: string;
  };
  requestOutput: {
    success: boolean;
    error: string | null;
    images: {
      imgSrc: string;
      width: number;
      height: number;
      imageId: string | number | null;
    }[];
  };
  data: {
    file: File;
    name: string;
    success: boolean;
    error: string | null;
    images: {
      imgSrc: string;
      width: number;
      height: number;
      imageId: string | number | null;
    }[];
  };
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
      const extension = input.file.name.split(".").pop();
      formData.append(
        slugify(input.name || input.file.name) +
          (extension ? `.${slugify(extension)}` : ""),
        input.file
      );
      const resp = await restRequest({
        ...options,
        variables: formData,
      });
      return {
        file: input.file,
        name: input.name || input.file.name,
        ...resp.data,
      };
    } catch (e: any) {
      console.error(e.stack || e.message || e);
      throw e;
    }
  },
  useHook: ({ restRequest }) => {
    const { enqueueSnackbar } = useSnackbar();
    return () => async (input) => {
      const response = await restRequest(input);
      if (response.error) {
        {
          enqueueSnackbar(response.error.substring(0, 312), {
            variant: "error",
          });
        }
      }
      return response;
    };
  },
};
