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
    images: Array<{
      file: File;
      fieldname: string;
    }>;
  };
  requestOutput: {
    success: boolean;
    error: string | null;
    images: Array<{
      fieldname: string;
      imageId: string | number | null;
      imgSrc: string;
      width: number;
      height: number;
    }>;
  };
  data: {
    success: boolean;
    error: string | null;
    images: Array<{
      fieldname: string;
      imageId: string | number | null;
      imgSrc: string;
      width: number;
      height: number;
    }>;
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
      const mapped = new Map<string, { name: string; file: File }>();
      for (const imgObj of input.images) {
        const name = imgObj.fieldname || imgObj.file.name;
        const file = imgObj.file;
        const extension = file.name.split(".").pop();
        const fieldname =
          slugify(name) + (extension ? `.${slugify(extension)}` : "");
        if (!mapped.has(fieldname)) {
          mapped.set(fieldname, { name, file });
        }
        formData.append(fieldname, file);
      }
      const resp = await restRequest({
        ...options,
        variables: formData,
      });
      return {
        ...resp.data,
        images: resp.data.images.map((elem) => {
          const before = mapped.get(elem.fieldname);
          return {
            ...elem,
            fieldname: before?.name || elem.fieldname,
          };
        }),
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
