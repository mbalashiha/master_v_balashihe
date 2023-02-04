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
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={initialValue}
        init={{
          language: "ru",
          language_url: "/tinymce/langs/ru.js", // site absolute URL
          browser_spellcheck: true,
          height: "100vh",
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
            "bullist numlist checklist outdent indent | removeformat | link image | code table help",
          content_style:
            "body { font-family:Inter,Roboto,Helvetica,Arial,sans-serif; font-size:14px }",
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
