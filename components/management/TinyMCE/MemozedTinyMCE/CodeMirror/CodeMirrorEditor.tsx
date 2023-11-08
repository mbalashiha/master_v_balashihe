import React, { useState, useEffect, useRef, useCallback } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { langs } from "@uiw/codemirror-extensions-langs";
import { EditorView } from "@codemirror/view";
import * as themes from "@uiw/codemirror-themes-all";

interface Props {
  initialHtml: string;
  htmlRef: React.MutableRefObject<string>;
  onChange: (savingHtml: string) => void;
}
const CodeMirrorEditor = ({ initialHtml, htmlRef, onChange }: Props) => {
  return (
    <CodeMirror
      value={initialHtml}
      height={"100%"}
      extensions={[langs.html(), EditorView.lineWrapping]}
      theme={themes.dracula}
      onChange={(value, viewUpdate) => {
        htmlRef.current = value;
        onChange(value);
      }}
    />
  );
};
export default CodeMirrorEditor;
