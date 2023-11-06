import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Portal, styled } from "@mui/material";
import util from "util";
import { useSnackbar } from "notistack";
import InsertCodeIcon from "../MemozedTinyMCE/InsertCodeIcon";
export interface MemoizedShortProps {
  initialValue: string;
  onEditorChange: (textHtml: string) => void;
  id?: string;
}
const MemoizedShort: React.FC<MemoizedShortProps> = React.memo(
  function MemoizedShort({
    initialValue,
    onEditorChange,
    id,
    ...rest
  }: MemoizedShortProps) {
    const [insertCodeIcon, setInsertCodeIcon] =
      React.useState<HTMLElement | null>(null);
    const editorRef: React.LegacyRef<Editor> = useRef<any>(null);
    return (
      <>
        <Portal container={insertCodeIcon}>
          <InsertCodeIcon />
        </Portal>
        <Editor
          id={id}
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
            onEditorChange(textHtml);
          }}
          id="tinymce-key-text-editor"
          init={{
            language: "ru",
            language_url: "/tinymce/langs/ru.js", // site absolute URL
            browser_spellcheck: true,
            height: "100%",
            width: "100%",
            menubar: false,
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
            },
            plugins: [
              "advlist",
              "autolink",
              "code",
              "lists",
              "link",
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
              "undo redo | casechange bold italic | " +
              "insertCodeButton | " +
              "alignleft aligncenter alignright alignjustify link | " +
              "code help removeformat ",
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
            valid_elements: "p[style],a[href|target],strong,b",
          }}
          {...rest}
        />
      </>
    );
  },
  (prevProps, nextProps) => {
    return true;
  }
) as any;
export default MemoizedShort;
