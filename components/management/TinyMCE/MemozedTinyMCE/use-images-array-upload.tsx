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
  const { enqueueSnackbar } = useSnackbar();
  const enqueueSnackbarRef = useRef(enqueueSnackbar);
  enqueueSnackbarRef.current = enqueueSnackbar;
  const arrayUploader = React.useCallback(
    async ({
      images,
    }: {
      images: Array<{
        id: string;
        file: File;
        fieldname: string;
      }>;
    }) => {
      const enqueueSnackbar = enqueueSnackbarRef.current;
      try {
        for (const inImage of images) {
          try {
            const uploadImage = uploadImageRef.current;
            const { images: resultArray } = await uploadImage({
              images: [inImage],
            });
            const image = resultArray[0];
            const editor = editorRef.current?.editor;
            const dom = editor?.dom;
            if (editor && dom) {
              const selectedImage = dom.select(`img[data-id="${image.id}"]`);
              if (!selectedImage?.length) {
                return alert(`No image with data-id "${image.id}"!`);
              } else {
                dom.setAttribs(selectedImage, {
                  src: image.imgSrc,
                  "data-original-width": image.width,
                  "data-original-height": image.height,
                  "data-id": null,
                });
                // const selectedImageTest = dom.select(
                //   `img[data-id="${image.id}"]`
                // );
                // alert(dom.getAttrib(selectedImageTest[0], "src"));
                // content = content.replace(
                //   replacingImageCode,
                //   `<img src="${image.imgSrc}" style="width:100%;height:auto;" data-original-width="${image.width}" data-original-height="${image.height}">`
                // );
                // editorRef.current?.editor?.setContent(content);
              }
            }
          } catch (e: any) {
            enqueueSnackbar(e.message || e.stack || e, {
              variant: "error",
            });
          }
        }
      } catch (e: any) {
        enqueueSnackbar(e.message || e.stack || e, {
          variant: "error",
        });
      } finally {
      }
    },
    [editorRef]
  );
  return { arrayUploader };
}
