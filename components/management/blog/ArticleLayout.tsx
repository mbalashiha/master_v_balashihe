import {
  Box,
  Button,
  Card,
  Grid,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { RefFormik } from "@components/ui";
import useArticleDraft from "@framework/management/blog/draft/use-article-draft";
import React, { useCallback } from "react";
import { useState, useContext, useMemo, ReactNode } from "react";
import { ArticleProvider } from "./ArticleProvider";
import { ArticleTextEditor } from "@components/management/blog";

interface Props {
  children?: React.ReactNode | React.ReactNode[];
}

export default function ArticleLayout({ children }: Props) {
  const { data } = useArticleDraft();
  return data ? (
    <RefFormik initialValues={{ ...data }} onSubmit={() => {}}>
      <ArticleProvider>
        <Grid container>
          <Grid item xs={12}>
            <ArticleTextEditor />
          </Grid>
        </Grid>
        {children}
      </ArticleProvider>
    </RefFormik>
  ) : null;
}
