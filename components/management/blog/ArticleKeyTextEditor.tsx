import {
  Box,
  Button,
  Card,
  FormControl,
  FormHelperText,
  FormLabel,
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
import ArticleSeoDescription from "./ArticleSeoDescription";
import ArticleH2 from "./ArticleH2";

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
    <Grid container spacing={1} p={{ xs: 0, sm: 1, xl: 2 }}>
      <Grid item xs={12}>
        <ArticleSeoDescription />
      </Grid>
      <Grid item xs={12}>
        <ArticleH2 />
      </Grid>
      <Grid item xs={12}>
        <FormControl sx={{ width: "100%" }}>
          <FormLabel htmlFor="keyTextHeadTinyMCE">
            Текст вверху статьи (можно не указывать)
          </FormLabel>
          {meta.error && (
            <FormHelperText error={Boolean(meta.error)}>
              * {meta.error}
            </FormHelperText>
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
              id={"keyTextHeadTinyMCE"}
              initialValue={initialValue}
              onEditorChange={onEditorChange}
            />
          </Box>
        </FormControl>
      </Grid>
    </Grid>
  );
}
