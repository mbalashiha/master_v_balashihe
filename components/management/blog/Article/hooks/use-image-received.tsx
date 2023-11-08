import React, { useRef } from "react";
import useImageUpload from "@framework/management/image/use-image-upload";
import { getFileIdName } from "@common/utils/get-file-id-name";
import { useRefFormik } from "@components/ui";
import { normalizeImage } from "@framework/utils/normalize/normalize-article";
import { useField } from "formik";

export function useImageReceived(imageFieldName: string) {
  const [imageIdField] = useField(imageFieldName + "Id");
  const [imageField] = useField(imageFieldName);
  const [titleField] = useField(imageFieldName+'.title');
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
          height,
          width,
        } = image;
        const nImage = normalizeImage({
          imageId,
          imgSrc,
          height,
          width,
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
