import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Portal, styled } from "@mui/material";
import util from "util";
import InsertCodeIcon from "./InsertCodeIcon";
import useImageUpload from "@framework/management/image/use-image-upload";
import { useSnackbar } from "notistack";
function insertAtLastIndex({
  targetString,
  symbolString,
  subString,
}: {
  targetString: string;
  symbolString: string;
  subString: string;
}) {
  const index = targetString.lastIndexOf(symbolString);
  if (index > 0) {
    return (
      targetString.substring(0, index) +
      subString +
      targetString.substring(index, targetString.length)
    );
  }

  return targetString + subString;
}
export interface MemoizedTinyMCEProps {
  initialValue: string;
  onEditorChange: (textHtml: string, text: string) => void;
  onBlur: (event: any) => void;
}
const MemoizedTinyMCE: React.FC<MemoizedTinyMCEProps> = React.memo(
  function MemoizedTinyMCE({
    initialValue,
    onEditorChange,
    ...rest
  }: MemoizedTinyMCEProps) {
    const [insertCodeIcon, setInsertCodeIcon] =
      React.useState<HTMLElement | null>(null);
    const uploaderRef = useRef<HTMLInputElement>(null);
    const editorRef: React.LegacyRef<Editor> = useRef<any>(null);
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
    }, []);
    const { enqueueSnackbar } = useSnackbar();
    const enqueueSnackbarRef = useRef(enqueueSnackbar);
    enqueueSnackbarRef.current = enqueueSnackbar;
    const arrayUploader = React.useCallback(
      async ({
        images,
        input,
      }: {
        images: Array<{
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
            const imageIndex = content.indexOf(` id="${image.fieldname}"`);
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
      [cleanBlobImages]
    );
    return (
      <>
        <input
          ref={uploaderRef}
          id="tinymce-uploader"
          type="file"
          name="pic"
          accept="image/*"
          multiple
          style={{ display: "none" }}
          onChange={async (event) => {
            const input = event.currentTarget;
            const files =
              input && input.files && input.files.length ? input.files : [];
            const promisesArray: Array<
              Promise<{
                file: File;
                fieldname: string;
              }>
            > = [];
            for (let i = 0; i < files.length; i++) {
              const file = files[i];
              if (file) {
                const idName = insertAtLastIndex({
                  targetString: file.name,
                  symbolString: ".",
                  subString: `-${file.lastModified || 0}-${file.size || 0}`,
                });
                const constructedPromise = new Promise<{
                  file: File;
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
                      `<img id="${idName}" src="` + img.src + `"/>`;
                    editorRef.current?.editor?.insertContent(
                      insertingHtmlImage
                    );
                    const promiseResult = { file, fieldname: idName };
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
          }}
        />
        <Portal container={insertCodeIcon}>
          <InsertCodeIcon />
        </Portal>
        <Editor
          tinymceScriptSrc="/tinymce/tinymce.min.js"
          initialValue={initialValue || ""}
          ref={editorRef}
          onInit={(evt, editor) => {
            const button = editor.editorContainer.querySelector(
              `[role="group"] button[title="Вставить текст из буфера обмена"]`
            );
            const svgIcon = button?.querySelector("svg");
            setInsertCodeIcon(svgIcon?.parentElement || null);
            svgIcon?.remove();
            button?.parentElement?.querySelectorAll("*").forEach((elem) => {
              if (elem && elem.classList && elem.classList.add) {
                elem.classList.add("main_color");
              }
            });
          }}
          onEditorChange={(__textHtml, editor) => {
            const textHtml = editor.getContent({ format: "html" });
            const text = editor
              .getContent({ format: "text" })
              .replace(/\s+/gim, " ");
            onEditorChange(textHtml, text);
          }}
          id="tinymce-editor-in-iframe"
          init={{
            language: "ru",
            language_url: "/tinymce/langs/ru.js", // site absolute URL
            browser_spellcheck: true,
            height: "100%",
            width: "100%",
            menubar: true,
            setup: function (editor) {
              /* Basic button that just inserts the date */
              editor.ui.registry.addButton("insertCodeButton", {
                tooltip: "Вставить текст из буфера обмена",
                text: `Вставить код`,
                icon: `insert-code-icon`,
                onAction: async function (_) {
                  let fromBuffer = await navigator.clipboard.readText();
                  if (fromBuffer) {
                    if (
                      !fromBuffer.includes("<") ||
                      !fromBuffer.includes(">")
                    ) {
                      fromBuffer = "<p>" + fromBuffer + "</p>";
                      fromBuffer = fromBuffer
                        .replace(/\r\n\r\n/g, "</p><p>")
                        .replace(/\n\n/g, "</p><p>");
                      fromBuffer = fromBuffer
                        .replace(/\r\n/g, "<br />")
                        .replace(/\n/g, "<br />");
                    }
                    editor.insertContent(fromBuffer);
                  }
                },
              });
              editor.ui.registry.addButton("imageUploadButton", {
                text: "Картинка",
                icon: "IMAGE",
                onAction: function (e) {
                  uploaderRef.current?.click();
                },
              });
            },
            plugins: [
              "advlist",
              "autolink",
              "code",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | casechange blocks | bold italic forecolor | " +
              "insertCodeButton imageUploadButton | " +
              "alignleft aligncenter alignright alignjustify | " +
              "bullist numlist checklist outdent indent | removeformat | link image code table help",
            content_style: `body { color: #06060e; font-family: Inter,Arial,sans-serif; font-weight: 500; font-size: 18px; }
               img { 
                box-shadow: 4px 4px 20px rgb(0 0 0 / 20%);
                border-radius: 24px; 
                margin: 6px;
               } `,
            content_langs: [
              { title: "Русский", code: "ru" },
              { title: "English", code: "en" },
            ],
            valid_elements:
              "@[class],p[style],h3,h4,h5,h6,a[href|target],strong/b," +
              "div[align|data-images-container],br,table,tbody,thead,tr,td,ul,ol,li,img[src|alt|width|height|id|data-name|title|data-original-width|data-original-height],paper,typography",
          }}
          {...rest}
        />
      </>
    );
  }
) as any;
export default MemoizedTinyMCE;
