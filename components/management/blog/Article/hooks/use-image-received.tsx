import React, { useRef } from "react";
import useImageUpload from "@framework/management/image/use-image-upload";
import { getInputFileIdName } from "@common/utils/get-file-id-name";
import { useRefFormik } from "@components/ui";
import { normalizeImage } from "@framework/utils/normalize/normalize-article";
import { useField } from "formik";
import { CMS } from "@common/types";
import { ID } from "@framework/types";

export function useImageReceived(imageFieldName: string) {
  const [imageIdField] = useField<ID | null>(
    imageFieldName + "Id"
  );
  const [imageField] = useField<CMS.Image | null>(imageFieldName);
  const [titleField] = useField(imageFieldName + ".title");
  const uploadImage = useImageUpload();
  const uploaderRef = useRef<HTMLInputElement>(null);
  const setImageToNull = () => {
    imageField.onChange({ target: { name: imageField.name, value: null } });
    imageIdField.onChange({ target: { name: imageIdField.name, value: null } });
  };
  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    const files = input && input.files && input.files.length ? input.files : [];
    const file = files[0];
    let image: CMS.Image | null = imageField.value || null;
    if (file) {
      const { id, fieldname } = getInputFileIdName(file);
      const result = await uploadImage({
        images: [{ file, id, fieldname }],
      });
      const { images, success } = result;
      let resultImage = images && images[0];
      if (resultImage && resultImage.imageId && resultImage.imgSrc) {
        const { imageId, imgSrc, height, width } = resultImage;
        image = normalizeImage({
          imageId,
          imgSrc,
          height,
          width,
        });
        imageIdField.onChange({
          target: { name: imageIdField.name, value: imageId },
        });
        imageField.onChange({
          target: { name: imageField.name, value: image },
        });
      } else {
        alert("Could not upload image: " + fieldname);
      }
    }
  };
  return {
    imageFieldName,
    onChange,
    setImageToNull,
    uploaderRef,
    image: imageField.value,
    imageId: imageIdField.value,
    titleField,
  };
}
