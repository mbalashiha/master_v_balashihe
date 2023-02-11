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
import { useRefFormik } from "@components/ui";
import { CMS } from "@common/types";
import { useArticleContext } from "./ArticleProvider";
import useSaveArticleText from "@framework/management/blog/article/draft/use-save-article-text";
const TinyMCE = dynamic(() => import("@components/ui/TinyMCE"), {
  ssr: false,
  loading: () => <></>,
});

export default React.memo(function ArticleTextEditor() {
  const form = useRefFormik<CMS.Blog.ArticleDraft>();
  const saveDraftText = useSaveArticleText();
  const { editorRef } = useArticleContext();
  const [initialValue] = React.useState(form.getInitialValues()?.textHtml);
  return (
    <>
      <Box
        sx={{
          height: "1080px",
          width: "100%",
          border: "none",
          background: "white",
          borderRadius: "8px",
          "& > textarea": {
            display: "none",
          },
        }}
      >
        <TinyMCE
          initialValue={initialValue}
          editorRef={editorRef}
          onBlur={() => saveDraftText({})}
          onEditorChange={(_, editor) => {
            const textHtml = editor.getContent({ format: "html" });
            form.setFieldValue("textHtml", textHtml);
            const text = editor.getContent({ format: "text" });
            form.setFieldValue("text", text);
          }}
        />
      </Box>
    </>
  );
});
