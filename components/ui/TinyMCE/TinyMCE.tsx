import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { styled } from "@mui/material";

interface Props extends React.ComponentProps<typeof Editor> {
  editorRef: React.MutableRefObject<any>;
}
export default function TinyMCE({
  editorRef,
  initialValue,
  onInit: _,
  ...rest
}: Props) {
  return (
    <>
      <Editor
        tinymceScriptSrc="/tinymce/tinymce.min.js"
        initialValue={initialValue || ""}
        onInit={(evt, editor) => {
          editorRef.current = editor;
        }}
        id="tinymce-editor-in-iframe"
        init={{
          language: "ru",
          language_url: "/tinymce/langs/ru.js", // site absolute URL
          browser_spellcheck: true,
          height: "100%",
          width: "100%",
          menubar: true,
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
