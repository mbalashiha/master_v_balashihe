import { getFileIdName } from "@common/utils/get-file-id-name";
import { Editor } from "@tinymce/tinymce-react";
import util from "util";
import { useImagesArrayUpload } from "./use-images-array-upload";

interface Props {
  editorRef: React.RefObject<Editor>;
}

export function useUploaderOnChange({ editorRef }: Props) {
  const { arrayUploader } = useImagesArrayUpload({ editorRef });
  return (async (
    editorRef: React.RefObject<Editor>,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = event.currentTarget;
    const files = input && input.files && input.files.length ? input.files : [];
    const promisesArray: Array<
      Promise<{
        file: File;
        id: string;
        fieldname: string;
      }>
    > = [];
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
            const insertingHtmlImage =
              `<img id="${id}" src="` + img.src + `"/>`;
            editorRef.current?.editor?.insertContent(insertingHtmlImage);
            const promiseResult = { file, fieldname, id };
            resolve(promiseResult);
          };
          fr.readAsDataURL(file);
        });
        promisesArray.push(constructedPromise);
      }
    }
    try {
      const resolvedArray = await Promise.all(promisesArray);
      arrayUploader({ input, images: resolvedArray });
    } catch (e: any) {
      console.error(e.stack || e.message || e);
      arrayUploader({ input, images: [] });
    }
  }).bind(null, editorRef);
}
