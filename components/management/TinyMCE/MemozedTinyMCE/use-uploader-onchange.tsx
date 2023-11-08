import { getFileIdName } from "@common/utils/get-file-id-name";
import { Editor } from "@tinymce/tinymce-react";
import { useSnackbar } from "notistack";
import { useRef } from "react";
import util from "util";
import { useImagesArrayUpload } from "./use-images-array-upload";

interface Props {
  editorRef: React.RefObject<Editor>;
}

export function useUploaderOnChange({ editorRef }: Props) {
  const { arrayUploader } = useImagesArrayUpload({ editorRef });
  const { enqueueSnackbar } = useSnackbar();
  const enqueueSnackbarRef = useRef(enqueueSnackbar);
  enqueueSnackbarRef.current = enqueueSnackbar;
  return async (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    try {
      const files =
        input && input.files && input.files.length ? input.files : [];

      const editor = editorRef.current?.editor;
      editor?.undoManager.add();
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file) {
          const { id, fieldname } = getFileIdName(file);
          const constructedPromise = new Promise<{
            file: File;
            id: string;
            fieldname: string;
          }>((resolve, reject) => {
            const fr = new FileReader();
            fr.onerror = (event) => {
              alert(util.inspect(event));
              reject(event);
            };
            fr.onabort = (event) => {
              alert(util.inspect(event));
              reject(event);
            };
            fr.onload = function () {
              const img = new Image();
              img.src = fr.result?.toString() || "";
              const editor = editorRef.current?.editor;
              const dom = editor?.dom;
              if (editor && dom) {
                const tImg = dom.create("img", {
                  "data-id": id,
                  src: img.src,
                });
                const timgContainer = dom.create("div", {
                  style: "text-align:center;",
                  "data-images-container": "1",
                });
                dom.add(timgContainer, tImg);
                editor.selection.setNode(timgContainer);
                // editorRef.current?.editor?.insertContent(insertingHtmlImage);
                const promiseResult = { file, fieldname, id };
                resolve(promiseResult);
              }
            };
            fr.readAsDataURL(file);
          });
          try {
            const editor = editorRef.current?.editor;
            const dom = editor?.dom;
            const resolved = await constructedPromise;
            await arrayUploader({ images: [resolved] });
            editor?.undoManager.add();
            editor?.fire("change");
          } catch (e: any) {
            console.error(e.stack || e.message || e);
            enqueueSnackbar(e.message || e.stack || e, {
              variant: "error",
            });
          }
        }
      }
    } finally {
      input.value = "";
    }
  };
}
