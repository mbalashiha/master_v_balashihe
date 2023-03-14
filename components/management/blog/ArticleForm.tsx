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
import {
  ConfirmDialog,
  RefFormik,
  SubmitButton,
  useRefFormik,
} from "@components/ui";
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
import DeleteDraftButton from "./Article/DeleteDraftButton";

interface Props {
  children?: React.ReactNode | React.ReactNode[];
}

export default function ArticleForm({ children }: Props) {
  const router = useRouter();
  const { setCreateButton, unsetCreateButton } = useFabButton();
  const { data } = useArticleDraft();
  const { existingArticleId: articleId, isCreatePage } = data! || {};
  useEffect(() => {
    if (!isCreatePage) {
      setCreateButton({ href: "/management/blog/article/create" });
    } else {
      unsetCreateButton();
    }
  }, [isCreatePage, setCreateButton, unsetCreateButton]);
  // if (!isValidating && data) {
  //   formRef?.current?.resetForm({ values: { ...data } });
  // }
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
        const title = values.title;
        const test_autoHandleSlug = title ? slugify(title) : null;
        if (!errors.title && !test_autoHandleSlug) {
          errors.title =
            "Введите корректное название статьи для пути URL страницы: " +
            (title || "null").toString().substring(0, 16);
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
          textHtml: html,
          textRawDraftContentState,
          published,
          orderNumber,
          blogCategoryId,
          existingArticleId,
        } = values;
        let textHtml = html;
        if (window.DOMParser) {
          const parser = new DOMParser();
          const document = parser.parseFromString(html, "text/html");
          const imgs = document.querySelectorAll<HTMLImageElement>("img");
          imgs.forEach((img) => {
            let first = img;
            let preFirst: any = first;
            while (preFirst?.tagName === "IMG") {
              preFirst = preFirst.previousSibling;
              if (preFirst?.tagName === "IMG") {
                first = preFirst;
              }
            }
            if (!first.parentElement?.getAttribute("data-images-container")) {
              const wrapper = document.createElement("div");
              wrapper.setAttribute("data-images-container", "1");
              // insert wrapper before el in the DOM tree
              first.parentElement?.insertBefore(wrapper, first);
              while (first?.tagName === "IMG") {
                const imgClone = first.cloneNode(true);
                wrapper.appendChild(imgClone);
                const olderFirst = first;
                first = olderFirst.nextSibling as any;
                olderFirst.remove();
              }
            }
          });
          textHtml =
            document.documentElement.querySelector("body")?.innerHTML ||
            textHtml;
          // alert(textHtml);
        }
        const article = {
          id,
          title,
          handle,
          autoHandleSlug:
            (title ? slugify(title) : null) || autoHandleSlug || null,
          text,
          textHtml,
          textRawDraftContentState,
          published: true,
          orderNumber,
          blogCategoryId,
          existingArticleId,
        };
        const { success, articleId, articleDraft } = await saveArticle({
          article,
        });
        if (success && articleId && isCreatePage) {
          helpers.resetForm();
          helpers.destroyForm();
          router.push({
            pathname: `/management/blog/article/edit/[articleId]`,
            query: {
              articleId,
            },
          });
        } else if (success && articleId) {
          helpers.resetForm({
            values: articleDraft,
          });
        }
      }}
    >
      <ArticleProvider>
        <Grid
          container
          spacing={2}
          mt={2}
          sx={{ "& > .MuiGrid-item": { pt: 0 } }}
        >
          <Grid item xs={12} md={8}>
            <ArticleTitle />
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            sx={{ display: "flex", alignItems: "end", pb: "22px" }}
          >
            <SubmitButton startIcon={<SaveIcon />}>Сохранить</SubmitButton>
            <DeleteDraftButton />
          </Grid>
          {data.url && (
            <Grid item xs={12} sx={{ display: "flex", alignItems: "end" }}>
              <Paper sx={{ width: "100%", p: 1, mb: 2, fontWeight: 600 }}>
                Страница на сайте:{" "}
                <a href={data.url} title={data.url}>
                  {data.url}
                </a>
              </Paper>
            </Grid>
          )}
          <Grid item xs={12}>
            <ArticleTextEditor />
          </Grid>
        </Grid>
        {children}
      </ArticleProvider>
    </RefFormik>
  ) : null;
}
