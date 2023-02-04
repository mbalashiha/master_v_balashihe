import {
  Box,
  Button,
  Card,
  Grid,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import React, { useRef } from "react";
import dynamic from "next/dynamic";
const TinyMCE = dynamic(() => import("@components/ui/TinyMCE"), {
  ssr: false,
  loading: () => <></>,
});

export default function TinyMceIframePage() {
  const editorRef = useRef<any>(null);
  const log = () => {
    if (editorRef.current) {
      const editor = editorRef.current;
      console.log(editor.getContent());
    }
  };
  return (
    <>
      <TinyMCE editorRef={editorRef} />
    </>
  );
}
