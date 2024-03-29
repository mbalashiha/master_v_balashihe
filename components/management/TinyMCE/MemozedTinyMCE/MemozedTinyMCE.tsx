import React, {
  forwardRef,
  memo,
  useEffect,
  useRef,
  FC,
  useImperativeHandle,
  useCallback,
  useState,
} from "react";
import PromiseWorker from "promise-worker";
import { Editor } from "@tinymce/tinymce-react";
import { Box, Button, Portal, Stack, styled } from "@mui/material";
import util from "util";
import { useUploaderOnChange } from "./use-uploader-onchange";
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
import "prismjs/components/prism-bash";
import type { BeatifyCodeValue } from "@components/utils/beatifyCode";
import CodeIcon from "@mui/icons-material/Code";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

export interface MemoizedTinyMCEProps {
  initialValue: string;
  onEditorChange: (textHtml: string, text: string) => void;
  onBlur?: (event: any) => void;
  emitter?: EventEmitter;
  setContentEventName?: string;
  openCodeMirrorEventName?: string;
}
type InnerEditor = Editor["editor"];
export interface TinyMCEImperativeRef {
  editor: InnerEditor | undefined;
  toggleEditorFullscreen: () => void;
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
  const [fullScreenFlag, setFullScreenFlag] = useState<boolean>(false);
  const fullScreenFlagRef = useRef<boolean>(fullScreenFlag);
  useEffect(() => {
    fullScreenFlagRef.current = fullScreenFlag;
  }, [fullScreenFlag]);
  const fullScreenCloseHideTimeout = useRef<NodeJS.Timeout | null>(null);
  const toggleFullscreen = React.useCallback(() => {
    editorRef.current?.editor?.execCommand("mceFullScreen");
    setFullScreenFlag((value) => !value);
    if (
      fullScreenFlagRef.current &&
      editorRef.current?.editor?.editorContainer?.style
    ) {
      editorRef.current.editor.editorContainer.style.display = "none";
      if (fullScreenCloseHideTimeout.current) {
        clearTimeout(fullScreenCloseHideTimeout.current);
      }
      fullScreenCloseHideTimeout.current = setTimeout(() => {
        if (editorRef.current?.editor?.editorContainer?.style?.display) {
          editorRef.current.editor.editorContainer.style.display = "";
        }
      }, 100);
    }
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
    toggleEditorFullscreen: toggleFullscreen,
  }));
  useImperativeHandle(articleEvents.editorRef, () => ({
    editor: editorRef.current?.editor,
    toggleEditorFullscreen: toggleFullscreen,
  }));
  const { setModalImage } = useEditorContext();
  const prettierWorkerRef = useRef<PromiseWorker | null>(null);
  const formatPrismCodeBlocks = useCallback(
    async (targetNode?: HTMLPreElement, inLanguage?: string) => {
      const editor = editorRef.current?.editor;
      try {
        if (editor && editor.dom) {
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
              const promiseWorker = prettierWorkerRef.current;
              if (editor && promiseWorker) {
                var hasBeenResolved = false;
                const code = targetNode
                  ? await Promise.race([
                      promiseWorker.postMessage<
                        BeatifyCodeValue,
                        BeatifyCodeValue
                      >({
                        textContent: beforeInnerText,
                        language,
                      }),
                      new Promise<BeatifyCodeValue>((resolve) =>
                        setTimeout(() => {
                          try {
                            resolve({
                              textContent: beforeInnerText,
                              language,
                            });
                          } finally {
                            if (!hasBeenResolved) {
                              formatPrismCodeBlocks();
                            }
                          }
                        }, 400)
                      ),
                    ])
                  : await promiseWorker.postMessage<
                      BeatifyCodeValue,
                      BeatifyCodeValue
                    >({
                      textContent: beforeInnerText,
                      language,
                    });
                hasBeenResolved = true;
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
      } finally {
        if (targetNode) {
          const editor = editorRef.current?.editor;
          editor?.execCommand("CodeSample");
        }
      }
    },
    []
  );
  useEffect(() => {
    const prettierWorker = new Worker(
      new URL("components/utils/beatifyCodeWorker", import.meta.url)
    );
    const promiseWorker = new PromiseWorker(prettierWorker);
    prettierWorkerRef.current = promiseWorker;

    Prism.highlightAll();
    formatPrismCodeBlocks();
    return () => {
      prettierWorker.terminate();
    };
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
      <CustomMenubarContainer menuElement={menuElement}>
        <Stack flexDirection={"row"}>
          <Button startIcon={<CodeIcon />} onClick={openCodeMirror}>
            Редактор кода
          </Button>
          <Button
            startIcon={
              fullScreenFlag ? <FullscreenExitIcon /> : <FullscreenIcon />
            }
            onClick={toggleFullscreen}
            title="Ctrl+Shift+F"
          >
            {fullScreenFlag ? "Выйти из полного" : "Полный экран"}
          </Button>
        </Stack>
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
          // const body = dom.select("body")[0];
          const menubar: HTMLDivElement = editor.editorContainer.querySelector(
            `[role="menubar"]`
          ) as HTMLDivElement;
          setMenuElement(menubar);
          /*const button = editor.editorContainer.querySelector(
            `[role="group"] button[title="Вставить текст из буфера обмена"]`
          );*/
          // if (menubar && menubar.style) {
          //   (menubar.style as any)["margin-right"] = "200px";
          // }
          /*const svgIcon = button?.querySelector("svg");
          setInsertCodeIcon(svgIcon?.parentElement || null);
          svgIcon?.remove();
          button?.parentElement?.querySelectorAll("*").forEach((elem) => {
            if (elem && elem.classList && elem.classList.add) {
              elem.classList.add("main_color");
            }
          });*/
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
          autosave_interval: "24s",
          codesample_global_prismjs: true,
          content_css: [
            "/tinymce/prismjs/prism-okaidia.min.css",
            "/tinymce/prismjs/prism-line-numbers.min.css",
            "/additional/css/tahoma.css",
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
            "autosave",
          ],
          toolbar:
            "undo redo | casechange blocks | codesample bold italic forecolor | " +
            "insertCodeButton imageUploadButton | " +
            "alignleft aligncenter alignright alignjustify link | " +
            "restoredraft bullist numlist checklist outdent indent | removeformat | image code table help",
          autosave_retention: "360m",
          codesample_languages: [
            { text: "React.tsx", value: "tsx" },
            { text: "React.jsx", value: "jsx" },
            { text: "HTML/XML", value: "markup" },
            { text: "Bash", value: "bash" },
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
