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
import useSaveArticleText from "@framework/management/blog/draft/use-save-article-text";
const TinyMCE = dynamic(() => import("@components/ui/TinyMCE"), {
  ssr: false,
  loading: () => <></>,
});

export default React.memo(function ArticleTextEditor() {
  const form = useRefFormik<CMS.Blog.ArticleDraft>();
  const saveArticleTextDraft = useSaveArticleText();
  const formRef = useRef<{
    form: typeof form;
    saveArticleTextDraft: typeof saveArticleTextDraft;
  }>({ form, saveArticleTextDraft });
  formRef.current = { ...formRef.current, form, saveArticleTextDraft };
  const editorRef = useRef<any>(null);
  React.useEffect(() => {
    const beforeunloadListener = async () => {
      const { form, saveArticleTextDraft } = formRef.current;
      const all = form.getValues();
      const input = {
        articleTextDraft: {
          id: all?.id || null,
          existingArticleId: all?.existingArticleId || null,
          text: editorRef.current.getContent({ format: "text" }).trim(),
          textHtml: editorRef.current.getContent({ format: "html" }).trim(),
          textRawDraftContentState: null,
        },
      };
      await saveArticleTextDraft(input);
    };
    window.addEventListener("beforeunload", beforeunloadListener, false);
    return () =>
      window.removeEventListener("beforeunload", beforeunloadListener);
  }, []);
  return (
    <>
      <Box
        sx={{
          "&": {
            height: "1080px",
            width: "100%",
            border: "none",
            background: "white",
          },
          "& > textarea": {
            display: "none",
          },
        }}
      >
        <TinyMCE
          initialValue={form.getInitialValues()?.textHtml}
          editorRef={editorRef}
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
