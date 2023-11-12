import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { langs } from "@uiw/codemirror-extensions-langs";
import { EditorView } from "@codemirror/view";
import * as themes from "@uiw/codemirror-themes-all";

interface Props {
  initialHtml: string;
  htmlRef: React.MutableRefObject<string>;
  onChange: (savingHtml: string) => void;
}
const CodeMirrorEditor = memo<Props>(
  function CodeMirrorEditor({ initialHtml, htmlRef, onChange }: Props) {
  const extensions = React.useMemo(
    () => [langs.html(), EditorView.lineWrapping],
    []
  );
    return (
      <CodeMirror
        value={initialHtml}
        height={"100%"}
        extensions={extensions}
        theme={themes.dracula}
        onChange={(value, viewUpdate) => {
          htmlRef.current = value;
          onChange(value);
        }}
      />
    );
  },
  (prevProps, nextProps) => {
    return prevProps.initialHtml === nextProps.initialHtml;
  }
);
export default CodeMirrorEditor;
