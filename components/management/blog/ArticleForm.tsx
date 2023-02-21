import {
  Box,
  Button,
  Card,
  Grid,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { RefFormik, SubmitButton, useRefFormik } from "@components/ui";
import useArticleDraft from "@framework/management/blog/article/draft/use-article-draft";
import React, { useRef, useEffect, useMemo } from "react";
import { ArticleProvider } from "./ArticleProvider";
import { ArticleTextEditor } from "@components/management/blog";
import { Title } from "@mui/icons-material";
import ArticleTitle from "./ArticleTitle";
import useSaveArticle from "@framework/management/blog/article/use-save-article";
import { ValuesOfCorrectTypeRule } from "graphql";
import { slugify } from "@lib";
import { useRouter } from "next/router";
import { useFabButton } from "../Layout";

interface Props {
  children?: React.ReactNode | React.ReactNode[];
}

export default function ArticleForm({ children }: Props) {
  const { setCreateButton, unsetCreateButton } = useFabButton();
  const router = useRouter();
  const isCreatePage = useMemo(() => {
    return router.pathname.endsWith("/article/create");
  }, [router.pathname]);
  useEffect(() => {
    if (!isCreatePage) {
      setCreateButton({ href: "/management/blog/article/create" });
    } else {
      unsetCreateButton();
    }
  }, [isCreatePage, setCreateButton, unsetCreateButton]);
  const { data } = useArticleDraft();
  const saveArticle = useSaveArticle();
  return data ? (
    <RefFormik
      initialValues={data}
      validate={(values) => {
        const errors: any = {};
        if (!(values.text || "").trim()) {
          errors.text = "Обязательно введите текст статьи";
        }
        if (!(values.textHtml || "").trim()) {
          errors.textHtml = "Обязательно введите текст статьи";
        }
        if (!(values.title || "").trim()) {
          errors.title = "Введите название статьи";
        }
        return errors;
      }}
      onSubmit={async (values, helpers) => {
        const {
          id,
          title,
          handle,
          autoHandleSlug,
          text,
          textHtml,
          textRawDraftContentState,
          published,
          orderNumber,
          blogCategoryId,
          existingArticleId,
        } = values;
        const article = {
          id,
          title,
          handle,
          autoHandleSlug: title ? slugify(title) : null,
          text,
          textHtml,
          textRawDraftContentState,
          published,
          orderNumber,
          blogCategoryId,
          existingArticleId,
        };
        const { success, articleId, articleDraft } = await saveArticle({
          article,
        });
        if (success && articleId) {
          helpers.destroyForm();
        }
        if (isCreatePage && articleId) {
          router.push({
            pathname: `/management/blog/article/edit/[articleId]`,
            query: {
              articleId,
            },
          });
        }
      }}
    >
      <ArticleProvider>
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} md={8}>
            <ArticleTitle />
          </Grid>
          <Grid item xs={12} md={4} sx={{ display: "flex", alignItems: "end" }}>
            <SubmitButton startIcon={<SaveIcon />}>Сохранить</SubmitButton>
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
