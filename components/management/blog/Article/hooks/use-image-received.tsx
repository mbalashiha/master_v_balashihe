import React, { useRef } from "react";
import useImageUpload from "@framework/management/image/use-image-upload";
import { getFileIdName } from "@common/utils/get-file-id-name";
import { useRefFormik } from "@components/ui";
import { normalizeImage } from "@framework/utils/normalize/normalize-article";
import { useField } from "formik";

export function useImageReceived() {
  const [imageIdField] = useField("imageId");
  const [imageField] = useField("image");
  const uploadImage = useImageUpload();
  return async (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    const files = input && input.files && input.files.length ? input.files : [];
    const file = files[0];
    if (file) {
      const { id, fieldname } = getFileIdName(file);
      const result = await uploadImage({
        images: [{ file, id, fieldname }],
      });
      const { images, success } = result;
      let image = images && images[0];
      if (image && image.imageId && image.imgSrc) {
        const {
          imageId,
          imgSrc,
          altText,
          height,
          width,
          orderNumber,
          originalWidth,
          originalHeight,
          pathOfOriginal,
          createdAt,
          updatedAt,
        } = image as any;
        const nImage = normalizeImage({
          imageId,
          imgSrc,
          altText,
          height,
          width,
          orderNumber,
          originalWidth,
          originalHeight,
          pathOfOriginal,
          createdAt,
          updatedAt,
        });
        imageIdField.onChange({
          target: { name: imageIdField.name, value: imageId },
        });
        imageField.onChange({
          target: { name: imageField.name, value: nImage },
        });
      } else {
        alert("Could not upload image: " + fieldname);
      }
    }
  };
}
