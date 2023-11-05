import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { slugifyAbsUrl } from "@lib";
import SaveIcon from "@mui/icons-material/Save";
import { ArticleTabs } from "./ArticleTabs";
import { ConfirmDialog, RefFormik, SubmitButton } from "@components/ui";
import React, { useRef, useEffect, useMemo, forwardRef } from "react";
import { ArticleEditorContext, ArticleProvider } from "./ArticleProvider";
import useCheckArticle from "@framework/management/blog/article/draft/use-check-article";
import useSaveArticle from "@framework/management/blog/article/use-save-article";
import { ValuesOfCorrectTypeRule } from "graphql";
import { slugify } from "@lib";
import { useRouter } from "next/router";
// import DeleteDraftButton from "./Article/DeleteDraftButton";
import { useSnackbar } from "notistack";
import { TabsProvider } from "@components/common/Tabs/TabsProvider";
import { locale } from "@utils/locale";
import { Blog } from "@common/types/cms";
import usePrettierReact from "@framework/management/api/use-prettier-react";
import {
  escapeHtml,
  escapeHtmlTagsOnly,
  unescapeHtml,
  unescapeHtmlTagsOnly,
} from "./html-parser";
import { useArticleContext } from "./ArticleForm";
import { FormContextType } from "@components/ui/RefFormik";
import { OpenCodemirrorButton, ResetButton } from "./Article/Buttons";

interface Props {
  article: Blog.ArticleDraft;
}

export const ChildArticleForm = forwardRef<
  FormContextType<Blog.ArticleDraft>,
  Props
>(function ChildArticleForm({ article }, ref) {
  const hasArticle = Boolean(article && article.existingArticleId);
  const isCreatePage = !hasArticle;
  const existingArticleId = (hasArticle && article?.existingArticleId) || null;
  const router = useRouter();
  const checkArticle = useCheckArticle();
  const { enqueueSnackbar } = useSnackbar();
  const prettierReact = usePrettierReact();
  const providerRef: React.MutableRefObject<ArticleEditorContext | undefined> =
    useRef<ArticleEditorContext | undefined>();
  // useEffect(() => {
  //   if (!isCreatePage) {
  //     setCreateButton({ href: "/management/blog/article/create" });
  //   } else {
  //     unsetCreateButton();
  //   }
  // }, [isCreatePage, setCreateButton, unsetCreateButton]);
  const saveArticle = useSaveArticle();
  const { mutateArticle } = useArticleContext();
  return (
    <RefFormik
      ref={ref}
      initialValues={article}
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
        if (!values.templateId) {
          errors.templateId = "Выберите активный шаблон";
        }
        return errors;
      }}
      onSubmit={async (values, helpers) => {
        let {
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
          description,
        } = values;
        const replacer = async (inStr: string): Promise<string> => {
          const reg =
            /\<pre(\s+[^\>]+)?\>\s*\<code\>([^\>\<]+)\<\/code\>\s*\<\/pre\>/gm;
          let result;
          while ((result = reg.exec(inStr)) !== null) {
            const attribsString = result[1];
            const classNameMatch =
              attribsString && attribsString.match(/\s+class="([^\"\>]+)"/m);
            const className = classNameMatch && classNameMatch[1];
            const language =
              className?.startsWith("language-") &&
              className.substring("language-".length);
            const innerHTML = result[2];
            if (language && innerHTML) {
              const innerText = unescapeHtmlTagsOnly(innerHTML);
              const resp = await prettierReact({
                language,
                textContent: innerText,
              });
              const newStr = escapeHtmlTagsOnly(resp.textContent).trim();
              inStr = inStr.replace(innerHTML, newStr);
            }
          }
          return inStr;
        };
        textHtml = await replacer(textHtml);
        let renderHtml = textHtml;
        /*if (window.DOMParser) {
          const parser = new DOMParser();
          const document = parser.parseFromString(renderHtml, "text/html");
          const pre = document.querySelectorAll<HTMLPreElement>("pre");
          const codeBlocks: Array<() => Promise<void>> = [];
          for (const el of Array.from(pre)) {
            const className = el.getAttribute("class");
            if (
              className &&
              className.startsWith("language-") &&
              el.textContent
            ) {
              const language = className.substring("language-".length);
              if (language) {
                const code: HTMLPreElement = (
                  el.children.length === 1 && el.children[0].tagName === "CODE"
                    ? el.children[0]
                    : el
                ) as any;
              }
            }
          }
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
        }*/
        renderHtml = renderHtml.replace(/\"(\.\.\/+)+/gim, '"/');
        const article = {
          id,
          title,
          handle: (handle || "").trim(),
          autoHandleSlug:
            (title ? slugify(title) : null) || autoHandleSlug || null,
          absURL: slugifyAbsUrl(absURL || ""),
          description: description || "",
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
        if (articleDraft.textHtml !== textHtml) {
          alert("not equal");
        }
        if (success) {
          mutateArticle(articleDraft);
        }
      }}
    >
      <ArticleProvider providerRef={providerRef}>
        <Grid container spacing={1}>
          <Grid
            item
            xs={12}
            md={12}
            lg={2}
            xl={1.5}
            order={{ xs: 1, lg: 2 }}
            sx={{
              mt: { xs: 0, lg: "2px" },
              "& button": {
                width: { xs: "auto", lg: "100%" },
                minWidth: "160px",
              },
            }}
          >
            <Stack
              spacing={1}
              direction={{ xs: "row", lg: "column" }}
              justifyContent={"flex-end"}
            >
              <SubmitButton startIcon={<SaveIcon />}>Сохранить</SubmitButton>
              <ResetButton />
              <OpenCodemirrorButton />
            </Stack>
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            lg={10}
            xl={10.5}
            sx={{}}
            order={{ xs: 2, lg: 1 }}
          >
            <Container
              maxWidth="lg"
              sx={{
                float: { xs: "none", lg: "right" },
                "&&": { px: 0, py: 0 },
              }}
            >
              <TabsProvider>
                <ArticleTabs article={article} />
              </TabsProvider>
            </Container>
          </Grid>
        </Grid>
      </ArticleProvider>
    </RefFormik>
  );
});

export default ChildArticleForm;
