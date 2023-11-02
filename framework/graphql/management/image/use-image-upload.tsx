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
    images: Array<{
      file: File;
      fieldname: string;
      id: string;
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
      id: string;
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
      const mapped = new Map<string, { id: string; file: File }>();
      for (const imgObj of input.images) {
        const { file, fieldname, id } = imgObj;
        if (!mapped.has(fieldname)) {
          mapped.set(fieldname, { id, file });
        }
        formData.append(fieldname, file);
      }
      const resp = await restRequest({
        ...options,
        variables: formData,
      });
      if (resp.error) {
        const m = resp.error.match(/\<title\>\s*([^\<\>]+)\s*\<\/title\>/im);
        const err = m && m[1] ? m[1] : null;
        if (err) {
          resp.error = err;
        }
      }
      if (resp.error) {
        throw new Error(resp.error);
      }
      return {
        ...resp.data,
        error: resp.error || null,
        images: resp?.data?.images?.map((elem) => {
          const before = mapped.get(elem.fieldname);
          return {
            ...elem,
            fieldname: before?.id || elem.fieldname,
            id: before?.id || elem.fieldname,
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
