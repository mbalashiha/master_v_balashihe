import React, { memo, useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Box, Button, Portal, styled } from "@mui/material";
import util from "util";
import InsertCodeIcon from "./InsertCodeIcon";
import useImageUpload from "@framework/management/image/use-image-upload";
import { useSnackbar } from "notistack";
import { useUploaderOnChange } from "./use-uploader-onchange";
import CodeIcon from "@mui/icons-material/Code";
import CodeMirrorDialog from "./CodeMirror/CodeMirrorDialog";
import EventEmitter from "events";

export interface MemoizedTinyMCEProps {
  initialValue: string;
  onEditorChange: (textHtml: string, text: string) => void;
  onBlur: (event: any) => void;
  emitter?: EventEmitter;
  setContentEventName?: string;
  openCodeMirrorEventName?: string;
}
interface CustomMenubarProps {
  children: React.ReactNode | React.ReactNode[];
  menuElement: HTMLDivElement | null;
}
const CustomMenubarContainer = ({
  children,
  menuElement,
}: CustomMenubarProps) => {
  return (
    <>
      {menuElement ? (
        <Portal container={menuElement}>{children}</Portal>
      ) : (
        <Box
          sx={{
            height: 0,
            overflow: "visible",
            width: "100%",
            textAlign: "right",
            "& .Button-startIcon": {
              transform: "scale(1.4)",
            },
            "& > *": {
              zIndex: 2,
            },
          }}
        >
          {children}
        </Box>
      )}
    </>
  );
};
const MemoizedTinyMCE = memo<MemoizedTinyMCEProps>(
  function MemoizedTinyMCE({
    initialValue,
    onEditorChange,
    emitter,
    setContentEventName,
    openCodeMirrorEventName,
    ...rest
  }: MemoizedTinyMCEProps) {
    const htmlRef = useRef(initialValue);
    const [insertCodeIcon, setInsertCodeIcon] =
      React.useState<HTMLElement | null>(null);
    const [menuElement, setMenuElement] = React.useState<HTMLDivElement | null>(
      null
    );
    const uploaderRef = useRef<HTMLInputElement>(null);
    const editorRef: React.LegacyRef<Editor> = useRef<any>(null);
    const uploaderOnChange = useUploaderOnChange({ editorRef });
    const [codeMirrorOpened, setCodeMirrorOpened] = React.useState(false);

    const openCodeMirror = () => {
      setCodeMirrorOpened(true);
    };
    const closeCodeMirror = React.useCallback(() => {
      setCodeMirrorOpened(false);
    }, []);
    const onCodeMirrorSave = React.useCallback((savingHtml: string) => {
      editorRef.current?.editor?.setContent(savingHtml);
    }, []);
    useEffect(() => {
      if (emitter) {
        const listener = (textHtml: string) => {
          editorRef.current?.editor?.setContent(textHtml);
        };
        if (setContentEventName) {
          emitter.on(setContentEventName, listener);
        }
        const cmOpenlistener = () => {
          setCodeMirrorOpened(true);
        };
        if (openCodeMirrorEventName) {
          emitter.on(openCodeMirrorEventName, cmOpenlistener);
        }
        return () => {
          if (emitter) {
            if (setContentEventName) {
              emitter.off(setContentEventName, listener);
            }
            if (openCodeMirrorEventName) {
              emitter.off(openCodeMirrorEventName, cmOpenlistener);
            }
          }
        };
      }
    }, [emitter, setContentEventName, openCodeMirrorEventName]);
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
        <CustomMenubarContainer menuElement={menuElement}>
          <Button startIcon={<CodeIcon />} onClick={openCodeMirror}>
            Редактор кода
          </Button>
        </CustomMenubarContainer>
        {codeMirrorOpened && (
          <CodeMirrorDialog
            onSave={onCodeMirrorSave}
            close={closeCodeMirror}
            html={htmlRef.current}
          />
        )}
        <Editor
          tinymceScriptSrc="/tinymce/tinymce.min.js"
          initialValue={initialValue || ""}
          ref={editorRef}
          onInit={(evt, editor) => {
            const menubar: HTMLDivElement =
              editor.editorContainer.querySelector(
                `[role="menubar"]`
              ) as HTMLDivElement;
            // if (menubar && menubar.style) {
            //   (menubar.style as any)["margin-right"] = "200px";
            // }
            const button = editor.editorContainer.querySelector(
              `[role="group"] button[title="Вставить текст из буфера обмена"]`
            );
            const svgIcon = button?.querySelector("svg");
            setInsertCodeIcon(svgIcon?.parentElement || null);
            setMenuElement(menubar);
            svgIcon?.remove();
            button?.parentElement?.querySelectorAll("*").forEach((elem) => {
              if (elem && elem.classList && elem.classList.add) {
                elem.classList.add("main_color");
              }
            });
          }}
          onEditorChange={(__textHtml, editor) => {
            const textHtml = editor.getContent({ format: "html" });
            htmlRef.current = textHtml;
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
              "codesample",
            ],
            toolbar:
              "undo redo | casechange blocks | codesample bold italic forecolor | " +
              "insertCodeButton imageUploadButton | " +
              "alignleft aligncenter alignright alignjustify link | " +
              "bullist numlist checklist outdent indent | removeformat | image code table help",
            codesample_global_prismjs: false,
            codesample_languages: [
              { text: "React.tsx", value: "tsx" },
              { text: "React.jsx", value: "jsx" },
              { text: "HTML/XML", value: "markup" },
              { text: "JavaScript", value: "javascript" },
              { text: "CSS", value: "css" },
              { text: "PHP", value: "php" },
              { text: "Ruby", value: "ruby" },
              { text: "Python", value: "python" },
              { text: "Java", value: "java" },
              { text: "C", value: "c" },
              { text: "C#", value: "csharp" },
              { text: "C++", value: "cpp" },
            ],
            content_style: `body { 
                    padding: 0 10px 0 10px;
                    font-family: Roboto, "Segoe UI", Tahoma, Verdana, Arial;
                    font-weight: 500;
                    font-size: 18px;
                    line-height: 28px;
                    color: #0e0e0f;
                  }
                  pre.language-tsx, pre.language-jsx {
                    color: #000013;
                    font-size: 14px;
                    line-height: 16px;
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
               } 
               td {
                  padding: 12px;
               }
               td[colspan] {
                  text-align: center;
               }
               td p {
                  margin: 0 0 1px 0;
                  padding: 0;
               }`,
            content_langs: [
              { title: "Русский", code: "ru" },
              { title: "English", code: "en" },
            ],
            valid_elements:
              "@[style],p,h1,h2,h3,h4,h5,h6,a[href|target],strong/b,i[class]," +
              "div[class|align|data-images-container],br,span,table[border],caption,tbody,thead,tfoot,tr,th,td[colspan|rowspan],ul,ol,li,img[src|alt|width|height|id|data-id|title|data-original-width|data-original-height],pre[class],code[class],sub,sup",
          }}
          {...rest}
        />
      </>
    );
  },
  (oldProps, newProps) => {
    return true;
  }
);
export default MemoizedTinyMCE;
