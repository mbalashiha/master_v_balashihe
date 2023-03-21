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
import { useField } from "formik";
import TinyMCE from "@components/ui/TinyMCE";
import { useRouter } from "next/router";

export default function ArticleTextEditor() {
  const form = useRefFormik<CMS.Blog.ArticleDraft>();
  const saveDraftText = useSaveArticleText();
  const mutRef = React.useRef({ form, saveDraftText });
  mutRef.current = { ...mutRef.current, form, saveDraftText };
  const onBlur = React.useCallback(() => {
    const { saveDraftText } = mutRef.current;
    saveDraftText({});
  }, []);
  const onEditorChange = React.useCallback((textHtml: string, text: string) => {
    const { form } = mutRef.current;
    form.setFieldValue("textHtml", textHtml);
    form.setFieldValue("text", text);
  }, []);
  const [htmlFieled, meta] = useField("textHtml");
  const initialValue = form.formIsResetting ? "" : htmlFieled.value;
  return (
    <>
      {meta.error && (
        <Paper
          sx={{
            my: 1,
            mx: 0.5,
            px: 1.5,
            color: "#d80000",
            fontWeight: 600,
            fontSize: "14pt",
          }}
        >
          * {meta.error}
        </Paper>
      )}
      <Box
        sx={{
          border: "none",
          width: "100%",
          "& > textarea": {
            display: "none",
          },
          "&, & > *, & .tox.tox-tinymce": {
            borderRadius: "0 0 8px 8px",
            height: "105vh",
            background: "white",
          },
        }}
      >
        {form.formIsResetting ? null : (
          <TinyMCE
            initialValue={initialValue}
            onBlur={onBlur}
            onEditorChange={onEditorChange}
          />
        )}
      </Box>
    </>
  );
}
