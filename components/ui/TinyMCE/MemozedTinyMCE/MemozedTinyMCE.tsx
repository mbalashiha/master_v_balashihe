import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Portal, styled } from "@mui/material";
import util from "util";
import InsertCodeIcon from "./InsertCodeIcon";
import useImageUpload from "@framework/management/image/use-image-upload";
import { useSnackbar } from "notistack";
import { useUploaderOnChange } from "./use-uploader-onchange";
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
    const uploaderOnChange = useUploaderOnChange({ editorRef });
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
          onChange={uploaderOnChange}
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
            content_css: "/additional/css/roboto.css",
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
              "alignleft aligncenter alignright alignjustify link | " +
              "bullist numlist checklist outdent indent | removeformat | image code table help",
            content_style: `body { 
                    padding: 0 10px 0 10px;
                    font-family: Roboto, "Segoe UI", Tahoma, Verdana, Arial;
                    font-weight: 500;
                    font-size: 18px;
                    line-height: 28px;
                    color: #0e0e0f;
                  }
              @media (min-width: 800px) {
                body {
                  padding: 0 20px 0 20px;
                }
              }
              @media (min-width: 900px) {
                body {
                  padding: 0 40px 0 40px;
                }
              }
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
              "@[class],p[style],h1,h2,h3,h4,h5,h6,a[href|target],strong/b," +
              "div[align|data-images-container],br,table,tbody,thead,tr,td,ul,ol,li,img[src|alt|width|height|id|data-id|title|data-original-width|data-original-height]",
          }}
          {...rest}
        />
      </>
    );
  }
) as any;
export default MemoizedTinyMCE;
