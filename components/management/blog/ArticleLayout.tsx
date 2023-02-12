import {
  Box,
  Button,
  Card,
  Grid,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { RefFormik, useRefFormik } from "@components/ui";
import useArticleDraft from "@framework/management/blog/article/draft/use-article-draft";
import React, { useRef } from "react";
import { ArticleProvider } from "./ArticleProvider";
import { ArticleTextEditor } from "@components/management/blog";
import { Title } from "@mui/icons-material";
import ArticleTitle from "./ArticleTitle";

interface Props {
  children?: React.ReactNode | React.ReactNode[];
}

export default function ArticleLayout({ children }: Props) {
  const { data } = useArticleDraft();

  return data ? (
    <RefFormik initialValues={{ ...data }} onSubmit={() => {}}>
      <ArticleProvider>
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} md={8}>
            <ArticleTitle />
          </Grid>
          <Grid item xs={12} md={4}>
            <Button type="submit">Сохранить</Button>
          </Grid>
          <Grid item xs={12}>
            <ArticleTextEditor />
          </Grid>
        </Grid>
        {children}
      </ArticleProvider>
    </RefFormik>
  ) : null;
}
