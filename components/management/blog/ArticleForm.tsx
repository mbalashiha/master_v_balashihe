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
import { ArticleTabs } from "./ArticleTabs";
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
import { useSnackbar } from "notistack";

interface Props {
  // children?: React.ReactNode | React.ReactNode[];
}

export default function ArticleForm({}: Props) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
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
        if (typeof values !== "object") {
          throw new Error(
            "Formik form values is not an object. How is that possible?"
          );
        }
        const errors: any = {};
        // if (!(values.text || "").trim()) {
        // }
        if ((values.textHtml || "").trim().length < 6) {
          errors.textHtml = "Обязательно введите текст статьи";
          errors.text = "Обязательно введите текст статьи";
          enqueueSnackbar(errors.textHtml, {
            variant: "error",
          });
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
          textHtml,
          textRawDraftContentState,
          published,
          orderNumber,
          blogCategoryId,
          existingArticleId,
          imageId,
        } = values;
        let renderHtml = textHtml;
        if (window.DOMParser) {
          const parser = new DOMParser();
          const document = parser.parseFromString(renderHtml, "text/html");
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
          renderHtml =
            document.documentElement.querySelector("body")?.innerHTML ||
            textHtml;
        }
        renderHtml = renderHtml
          .replace(/<table(\s+[^>]*)?>/g, `<div data-component-tag="table"$1>`)
          .replace(/<\/table>/g, `</div>`);
        renderHtml = renderHtml
          .replace(/<tbody(\s+[^>]*)?>/g, `<div data-component-tag="tbody"$1>`)
          .replace(/<\/tbody>/g, `</div>`);
        renderHtml = renderHtml
          .replace(/<thead(\s+[^>]*)?>/g, `<div data-component-tag="thead"$1>`)
          .replace(/<\/thead>/g, `</div>`);
        renderHtml = renderHtml
          .replace(/<tfoot(\s+[^>]*)?>/g, `<div data-component-tag="tfoot"$1>`)
          .replace(/<\/tfoot>/g, `</div>`);
        renderHtml = renderHtml
          .replace(/<tr(\s+[^>]*)?>/g, `<div data-component-tag="tr"$1>`)
          .replace(/<\/tr>/g, `</div>`);
        renderHtml = renderHtml
          .replace(/<th(\s+[^>]*)?>/g, `<div data-component-tag="th"$1>`)
          .replace(/<\/th>/g, `</div>`);
        renderHtml = renderHtml
          .replace(/<td(\s+[^>]*)?>/g, `<div data-component-tag="td"$1>`)
          .replace(/<\/td>/g, `</div>`);

        const article = {
          id,
          title,
          handle,
          autoHandleSlug:
            (title ? slugify(title) : null) || autoHandleSlug || null,
          text,
          textHtml,
          renderHtml,
          textRawDraftContentState,
          published: true,
          orderNumber,
          blogCategoryId,
          existingArticleId,
          imageId: imageId || null,
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
        <Grid container sx={{ my: 1 }}>
          <Grid
            item
            xs={12}
            md={12}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Stack spacing={1} direction="row">
              <SubmitButton startIcon={<SaveIcon />}>Сохранить</SubmitButton>
              <DeleteDraftButton />
            </Stack>
          </Grid>
        </Grid>
        <ArticleTabs />
      </ArticleProvider>
    </RefFormik>
  ) : null;
}
