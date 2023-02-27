import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Portal, styled } from "@mui/material";
import InsertCodeIcon from "./InsertCodeIcon";

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
    return (
      <>
        <Portal container={insertCodeIcon}>
          <InsertCodeIcon />
        </Portal>
        <Editor
          tinymceScriptSrc="/tinymce/tinymce.min.js"
          initialValue={initialValue || ""}
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
          onEditorChange={(text, editor) => {
            const textHtml = editor.getContent({ format: "html" });
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
              "insertCodeButton | " +
              "alignleft aligncenter alignright alignjustify | " +
              "bullist numlist checklist outdent indent | removeformat | link image code table help",
            content_style:
              "body { color: #10101a; font-family: Inter,Arial,sans-serif; font-weight: 500; font-size: 18px; }",
            content_langs: [
              { title: "Русский", code: "ru" },
              { title: "English", code: "en" },
            ],
          }}
          {...rest}
        />
      </>
    );
  }
) as any;
export default MemoizedTinyMCE;
