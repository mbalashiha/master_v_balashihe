import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Portal, styled } from "@mui/material";
import util from "util";
import InsertCodeIcon from "./InsertCodeIcon";
import useImageUpload from "@framework/management/image/use-image-upload";
import { useSnackbar } from "notistack";

interface Props {
  editorRef: React.RefObject<Editor>;
}
export function useImagesArrayUpload({ editorRef }: Props) {
  const uploadImage = useImageUpload();
  const uploadImageRef = useRef(uploadImage);
  uploadImageRef.current = uploadImage;
  const cleanBlobImages = React.useCallback(() => {
    let content =
      editorRef.current?.editor?.getContent({
        format: "html",
      }) || "";
    let lastIndex = 0;
    while (lastIndex >= 0) {
      const openTagIndex = content.indexOf(`<img `, lastIndex);
      const closeTagIndex =
        openTagIndex >= 0 ? content.indexOf(`>`, openTagIndex) : -1;
      const replacingImageCode = content.substring(
        openTagIndex,
        closeTagIndex + 1
      );
      lastIndex = closeTagIndex;
      if (closeTagIndex >= 0) {
        let hasBeenReplaced = false;
        const changedImageCode = replacingImageCode.replace(
          /\s+src="([^\"]+)"/im,
          (matched, group1) => {
            if (!group1 || /^(\.+\/|\/|\:\/\/|https?\:)/im.test(group1)) {
              return matched;
            } else {
              hasBeenReplaced = true;
              return matched.replace(group1, "");
            }
          }
        );
        if (hasBeenReplaced) {
          content = content.replace(replacingImageCode, changedImageCode);
          editorRef.current?.editor?.setContent(content);
        }
      }
    }
  }, [editorRef]);
  const { enqueueSnackbar } = useSnackbar();
  const enqueueSnackbarRef = useRef(enqueueSnackbar);
  enqueueSnackbarRef.current = enqueueSnackbar;
  const arrayUploader = React.useCallback(
    async ({
      images,
      input,
    }: {
      images: Array<{
        id: string;
        file: File;
        fieldname: string;
      }>;
      input: EventTarget & HTMLInputElement;
    }) => {
      input.value = "";
      const uploadImage = uploadImageRef.current;
      const enqueueSnackbar = enqueueSnackbarRef.current;
      try {
        const { images: resultArray } = await uploadImage({
          images,
        });
        for (const image of resultArray) {
          let content =
            editorRef.current?.editor?.getContent({
              format: "html",
            }) || "";
          const imageIndex = content.indexOf(` id="${image.id}"`);
          if (imageIndex < 0) {
            alert("image has not been found in editor html content!");
          } else {
            const openTagIndex = content.lastIndexOf(`<img `, imageIndex + 1);
            const closeTagIndex =
              openTagIndex >= 0 ? content.indexOf(`>`, imageIndex) : -1;
            const replacingImageCode = content.substring(
              openTagIndex,
              closeTagIndex + 1
            );
            content = content.replace(
              replacingImageCode,
              `<img src="${image.imgSrc}" data-original-width="${image.width}" data-original-height="${image.height}">`
            );
            editorRef.current?.editor?.setContent(content);
          }
        }
      } catch (e: any) {
        enqueueSnackbar(e.message || e, {
          variant: "error",
        });
      }
      cleanBlobImages();
    },
    [cleanBlobImages, editorRef]
  );
  return { arrayUploader };
}
