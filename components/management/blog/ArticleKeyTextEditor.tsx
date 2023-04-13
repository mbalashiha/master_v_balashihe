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
import useSaveArticleKeyText from "@framework/management/blog/article/draft/use-save-article-key-text";
import { useField } from "formik";
import { ShortTinyMCE } from "@components/management/TinyMCE";
import { useRouter } from "next/router";

export default function ArticleKeyTextEditor() {
  const form = useRefFormik<CMS.Blog.ArticleDraft>();
  const saveDraftKeyText = useSaveArticleKeyText();
  const [timeoutId, setTimeoutId] = React.useState<number | null>(null);
  const doTimeout = () => {
    if (!timeoutId) {
      const timeoutId = window.setTimeout(async () => {
        try {
          await saveDraftKeyText({});
        } catch (e: any) {
          console.error("do-Timeout:", e.stack || e.message || e);
        } finally {
          setTimeoutId(null);
        }
      }, 3000);
      setTimeoutId(timeoutId);
    }
  };
  const mutRef = React.useRef({ form, doTimeout, timeoutId, saveDraftKeyText });
  mutRef.current = {
    ...mutRef.current,
    form,
    doTimeout,
    timeoutId,
    saveDraftKeyText,
  };
  React.useEffect(() => {
    const { timeoutId } = mutRef.current;
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);
  const onBlur = React.useCallback(() => {
    const { saveDraftKeyText } = mutRef.current;
    saveDraftKeyText({});
  }, []);
  const onEditorChange = React.useCallback((keyTextHtml: string) => {
    const { form, doTimeout } = mutRef.current;
    form.setFieldValue("keyTextHtml", keyTextHtml);
    doTimeout();
  }, []);
  const [keyTextHtmlFieled, meta] = useField("keyTextHtml");
  const initialValue = form.formIsResetting ? "" : keyTextHtmlFieled.value;
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
            height: "600px",
            background: "white",
          },
        }}
      >
        {form.formIsResetting ? null : (
          <ShortTinyMCE
            initialValue={initialValue}
            onBlur={onBlur}
            onEditorChange={onEditorChange}
          />
        )}
      </Box>
    </>
  );
}
