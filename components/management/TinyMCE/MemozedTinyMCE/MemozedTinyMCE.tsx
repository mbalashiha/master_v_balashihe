import React, {
  forwardRef,
  memo,
  useEffect,
  useRef,
  FC,
  useImperativeHandle,
  useCallback,
} from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Box, Button, Portal, styled } from "@mui/material";
import util from "util";
import InsertCodeIcon from "./InsertCodeIcon";
import { useUploaderOnChange } from "./use-uploader-onchange";
import CodeIcon from "@mui/icons-material/Code";
import CodeMirrorDialog from "./CodeMirror/CodeMirrorDialog";
import EventEmitter from "events";
import { useEditorContext } from "@components/management/blog/Article/BodyEditor/ProviderTinyMCE";
import { useArticleEvents } from "@components/management/blog/ArticleEventsProvider";
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.min.css";
import "prismjs/plugins/normalize-whitespace/prism-normalize-whitespace";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import delay from "delay";
import beatifyCode from "../../../utils/beatifyCode";

type InnerEditor = Editor["editor"];
export interface MemoizedTinyMCEProps {
  initialValue: string;
  onEditorChange: (textHtml: string, text: string) => void;
  onBlur?: (event: any) => void;
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

export interface TinyMCEImperativeRef {
  editor: InnerEditor | undefined;
  dom:
    | import("/home/yoo/cms/master_v_balashihe/node_modules/.pnpm/tinymce@6.3.1/node_modules/tinymce/tinymce").DOMUtils
    | undefined;
}
const ForwardingTinyMCEEditorRef = forwardRef<
  TinyMCEImperativeRef,
  MemoizedTinyMCEProps
>(function MemoizedTinyMCE(
  {
    initialValue,
    onEditorChange,
    emitter,
    setContentEventName,
    openCodeMirrorEventName,
    ...rest
  }: MemoizedTinyMCEProps,
  ref
) {
  const htmlRef = useRef(initialValue);
  const [insertCodeIcon, setInsertCodeIcon] =
    React.useState<HTMLElement | null>(null);
  const [menuElement, setMenuElement] = React.useState<HTMLDivElement | null>(
    null
  );
  const articleEvents = useArticleEvents();
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
  useImperativeHandle(ref, () => ({
    editor: editorRef.current?.editor,
    dom: editorRef.current?.editor?.dom,
  }));
  useImperativeHandle(articleEvents.editorRef, () => ({
    editor: editorRef.current?.editor,
    dom: editorRef.current?.editor?.dom,
  }));
  const { setModalImage } = useEditorContext();

  const formatPrismCodeBlocks = useCallback(
    async (targetNode?: HTMLPreElement, inLanguage?: string) => {
      const editor = editorRef.current?.editor;
      if (editor) {
        const pres: HTMLPreElement[] = targetNode
          ? [targetNode]
          : editor.dom.select("pre");
        for (const el of pres) {
          const getLanguage = (): string => {
            const m = (el.className || "").match(/language\-(\w+)/);
            return (m && m[1]) || "";
          };
          const language: any = inLanguage ? inLanguage : getLanguage();
          if (language && el.innerText) {
            const beforeInnerText = el.innerText;
            const editor = editorRef.current?.editor;
            if (editor) {
              const code = await beatifyCode({
                textContent: beforeInnerText,
                language,
              });
              if (code.textContent !== beforeInnerText) {
                editor.undoManager.add();
                el.textContent = code.textContent;
                Prism.highlightElement(el);
                editor.fire("change");
              }
            }
          }
        }
      }
    },
    []
  );
  useEffect(() => {
    Prism.highlightAll();
    formatPrismCodeBlocks();
  }, [formatPrismCodeBlocks]);
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
          const dom = editor.dom;
          // const head = dom.select("head")[0];
          //for body //var body = ed.dom.select('body')[0]
          // dom.add(head, "script", {
          //   src: "/tinymce/prismjs/prism.js",
          //   type: "text/javascript",
          // });
          // dom.add(head, "link", {
          //   src: "/path/to/file1.js",
          //   type: "text/javascript",
          // });
          const body = dom.select("body")[0];
          dom.addClass(body, "line-numbers");
          const menubar: HTMLDivElement = editor.editorContainer.querySelector(
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
          relative_urls: false,
          menubar: true,
          codesample_global_prismjs: true,
          content_css: [
            "/tinymce/prismjs/prism-okaidia.min.css",
            "/tinymce/prismjs/prism-line-numbers.min.css",
            "/additional/css/roboto.css",
            "/css/my_tinymce_styles.css",
          ],
          setup: function (editor) {
            editor.on("click", (event) => {
              if (event.target.nodeName === "PRE") {
                const el: HTMLPreElement = event.target;
                const m = (el.className || "").match(/language\-(\w+)/);
                const language = (m && m[1]) || "";
                if (language) {
                  formatPrismCodeBlocks(event.target, language);
                }
              }
            });
            editor.on("dblclick", (event) => {
              if (event.target.nodeName === "IMG") {
                const dom = editorRef.current?.editor?.dom;
                if (dom) {
                  const img: HTMLImageElement = event.target;
                  // alert(
                  //   "Editor Clicked!  Element src: " + dom.getAttrib(img, "src")
                  // );
                  setModalImage(img);
                }
              }
            });
            // editor.on("dblclick", (event) => {});
            editor.on("keydown", (event) => {
              articleEvents.keydownListener(event);
            });
            let commandBefore: string = "";
            editor.on("ExecCommand", function (e) {
              // console.log("TinyMCE: The " + e.command + " command was fired.");
              if (
                commandBefore === "codesample" ||
                e.command === "codesample"
              ) {
                setTimeout(() => {
                  formatPrismCodeBlocks();
                }, 50);
              }
              commandBefore = e.command;
            });
            editor.ui.registry.addButton("insertCodeButton", {
              tooltip: "Вставить текст из буфера обмена",
              text: `Вставить текст`,
              icon: `insert-code-icon`,
              onAction: async function (_) {
                let fromBuffer = await navigator.clipboard.readText();
                if (fromBuffer) {
                  if (!fromBuffer.includes("<") || !fromBuffer.includes(">")) {
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
          content_langs: [
            { title: "Русский", code: "ru" },
            { title: "English", code: "en" },
          ],
          valid_elements:
            "@[style],p,h1,h2,h3,h4,h5,h6,a[href|target],strong/b,i[class]," +
            "div[class|align|data-image-container|data-image-title],br,span,table[border],caption,tbody,thead,tfoot,tr,th,td[colspan|rowspan],ul,ol,li,img[src|alt|width|height|id|data-id|title|data-original-width|data-original-height],pre[class],code[class],sub,sup",
        }}
        {...rest}
      />
    </>
  );
});
const MemoizedTinyMCE = memo(
  ForwardingTinyMCEEditorRef,
  (oldProps, newProps) => {
    return true;
  }
);
export default MemoizedTinyMCE;
