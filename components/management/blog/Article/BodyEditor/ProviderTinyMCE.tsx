import MemoizedTinyMCE, {
  MemoizedTinyMCEProps,
} from "../../../TinyMCE/MemozedTinyMCE";
import React, { useState, useContext, memo, useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Box, Button, Portal, styled } from "@mui/material";
import util from "util";
import { TinyMCEImperativeRef } from "@components/management/TinyMCE/MemozedTinyMCE/MemozedTinyMCE";
import ImageUploadModal from "./ImageUploadModal";

export interface EditorContext {
  editorRef: React.RefObject<TinyMCEImperativeRef>;
  setModalImage: React.Dispatch<React.SetStateAction<HTMLImageElement | null>>;
}
const EditorContext = React.createContext<Partial<EditorContext>>({});
interface Props extends MemoizedTinyMCEProps {}

export const TinyMCEProdiver = ({ ...props }: Props) => {
  const [modalImg, setModalImage] = useState<HTMLImageElement | null>(null);
  const close = () => setModalImage(null);
  const editorRef =
    useRef<TinyMCEImperativeRef>() as React.RefObject<TinyMCEImperativeRef>;
  return (
    <EditorContext.Provider value={{ editorRef, setModalImage }}>
      <ImageUploadModal modalImg={modalImg} close={close} />
      <MemoizedTinyMCE ref={editorRef} {...props} />
    </EditorContext.Provider>
  );
};

export const useEditorContext = () => {
  return useContext(EditorContext) as EditorContext;
};
