import {
  Box,
  Button,
  Card,
  Grid,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { slugifyAbsUrl } from "@lib";
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
import {
  ArticleEditorContext,
  ArticleProvider,
  useArticleContext,
} from "./ArticleProvider";
import { ArticleTextEditor } from "@components/management/blog";
import { Title } from "@mui/icons-material";
import ArticleTitle from "./ArticleTitle";
import useCheckArticle from "@framework/management/blog/article/draft/use-check-article";
import useSaveArticle from "@framework/management/blog/article/use-save-article";
import { ValuesOfCorrectTypeRule } from "graphql";
import { slugify } from "@lib";
import { useRouter } from "next/router";
import { useFabButton } from "../Layout";
import DeleteDraftButton from "./Article/DeleteDraftButton";
import { useSnackbar } from "notistack";
import { TabsProvider } from "@components/common/Tabs/TabsProvider";
import { locale } from "@utils/locale";

interface Props {
  // children?: React.ReactNode | React.ReactNode[];
}

export default function ArticleForm({}: Props) {
  const router = useRouter();
  const { setDuplicateArticle } = useArticleContext();
  const checkArticle = useCheckArticle();
  const { enqueueSnackbar } = useSnackbar();
  const { setCreateButton, unsetCreateButton } = useFabButton();
  const { data } = useArticleDraft();
  const { existingArticleId: articleId, isCreatePage } = data! || {};
  const providerRef: React.MutableRefObject<ArticleEditorContext | undefined> =
    useRef<ArticleEditorContext | undefined>();
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
      validate={async (values) => {
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
        values.title = (values.title || "").trim();
        values.handle = (values.handle || "").trim();
        const title = values.title;
        const test_autoHandleSlug = title ? slugify(title) : null;
        if (!values.title) {
          errors.title = "Введите название статьи";
        } else {
          try {
            const duplicateArticle = await checkArticle({
              title: values.title || "",
              handle: test_autoHandleSlug || "",
            });
            if (
              duplicateArticle &&
              duplicateArticle.id != values.existingArticleId
            ) {
              errors.title = `Статья с именем "${duplicateArticle.title}" уже существует.`;
              if (providerRef.current) {
                const { setDuplicateArticle } = providerRef.current;
                setDuplicateArticle(duplicateArticle);
              }
            }
          } catch (e: any) {
            console.error(e.stack || e.message);
            errors.title = e.message;
          }
        }
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
          absURL,
          text,
          textHtml,
          textRawDraftContentState,
          keyTextHtml,
          unPublished,
          notSearchable,
          notInList,
          orderNumber,
          blogCategoryId,
          existingArticleId,
          imageId,
          publishedAt,
          h2,
          secondImageId,
          templateId,
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
        renderHtml = renderHtml.replace(/\"(\.\.\/+)+/gim, '"/');
        const article = {
          id,
          title,
          handle: (handle || "").trim(),
          autoHandleSlug:
            (title ? slugify(title) : null) || autoHandleSlug || null,
          absURL: slugifyAbsUrl(absURL || ""),
          text,
          textHtml,
          renderHtml,
          textRawDraftContentState,
          keyTextHtml: (keyTextHtml || "").trim(),
          unPublished: Boolean(unPublished),
          notSearchable: Boolean(notSearchable),
          notInList: Boolean(notInList),
          orderNumber,
          blogCategoryId,
          existingArticleId,
          imageId: imageId || null,
          publishedAt: publishedAt || null,
          h2: h2 || null,
          secondImageId: secondImageId || null,
          templateId: templateId || null,
        };
        if (!article.handle) {
          article.handle = autoHandleSlug || "";
        }
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
      <ArticleProvider providerRef={providerRef}>
        <Grid container sx={{ my: 1 }}>
          <Grid
            item
            xs={12}
            md={12}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Stack spacing={"3px"} direction="row">
              <DeleteDraftButton />
              <SubmitButton startIcon={<SaveIcon />}>Сохранить</SubmitButton>
            </Stack>
          </Grid>
        </Grid>
        <TabsProvider>
          <ArticleTabs />
        </TabsProvider>
      </ArticleProvider>
    </RefFormik>
  ) : null;
}
