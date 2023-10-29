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
import { useRefFormik } from "@components/ui";
import { CMS } from "@common/types";
import { useField } from "formik";
import { ShortTinyMCE } from "@components/management/TinyMCE";
import { useRouter } from "next/router";

export default function ArticleKeyTextEditor() {
  const form = useRefFormik<CMS.Blog.ArticleDraft>();
  const mutRef = React.useRef({ form });
  mutRef.current = {
    ...mutRef.current,
    form,
  };
  const onEditorChange = React.useCallback((keyTextHtml: string) => {
    const { form } = mutRef.current;
    form.setFieldValue("keyTextHtml", keyTextHtml);
  }, []);
  const [keyTextHtmlFieled, meta] = useField("keyTextHtml");
  const initialValue = keyTextHtmlFieled.value;
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
          <ShortTinyMCE
            initialValue={initialValue}
            onEditorChange={onEditorChange}
          />
      </Box>
    </>
  );
}
