import React, { useState, useEffect, useRef, useCallback } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { loadLanguage, langs } from "@uiw/codemirror-extensions-langs";
import { abcdef } from "@uiw/codemirror-themes-all";
interface Props {
  initialHtml: string;
  htmlRef: React.MutableRefObject<string>;
}
const CodeMirrorEditor = ({ initialHtml, htmlRef }: Props) => {
  return (
    <CodeMirror
      value={initialHtml}
      height={"100%"}
      extensions={[langs.html()]}
      theme={abcdef}
      onChange={(value, viewUpdate) => {
        htmlRef.current = value;
      }}
    />
  );
};
export default CodeMirrorEditor;
