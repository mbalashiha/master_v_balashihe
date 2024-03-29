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
import { useArticleContext } from "./ArticleForm";
import { FormContextType } from "@components/ui/RefFormik";
import { OpenCodemirrorButton, ResetButton, ToggleTinyMceFullscreen } from "./Article/Buttons";
import useUpdateImages from "@framework/management/blog/images/use-update-images";
import { getImagesInputArray } from "@framework/utils/normalize";
import {
  ArticleEventsContext,
  ArticleEventsProvider,
} from "./ArticleEventsProvider";
import useIndexNowRequest from "@framework/management/index-now/use-index-now-request";

interface Props {
  article: Blog.ArticleDraft;
}

export const ChildArticleForm = forwardRef<
  FormContextType<Blog.ArticleDraft>,
  Props
>(function ChildArticleForm({ article }, ref) {
  const checkArticle = useCheckArticle();
  const { enqueueSnackbar } = useSnackbar();
  const providerRef: React.MutableRefObject<ArticleEventsContext | undefined> =
    useRef<ArticleEventsContext | undefined>();
  const saveArticle = useSaveArticle();
  const { mutateArticle } = useArticleContext();
  const postIndexNow = useIndexNowRequest();
  const mutateImages = useUpdateImages();
  return (
    <RefFormik<Blog.ArticleDraft>
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
        try {
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
            image,
            secondImage,
          } = values;
          /**
           * const replacer = async (inStr: string): Promise<string> => {
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
           t//extHtml = await replacer(textHtml);
          **/
          let renderHtml = textHtml;
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
          const {
            success,
            articleId,
            articleDraft,
            productionUuidsByIndexNow,
          } = await saveArticle({
            article,
          });
          Object.entries(productionUuidsByIndexNow).forEach(
            ([apiUrl, nodes]) => {
              if (apiUrl && nodes.length) {
                postIndexNow({ apiUrl, nodes });
              }
            }
          );
          if (success && articleDraft.textHtml !== textHtml) {
            alert("Not equal: articleDraft.textHtml !== textHtml");
          }
          try {
            const imagesResponse = await mutateImages({
              existingArticleId: articleDraft.existingArticleId || null,
              images: getImagesInputArray([image, secondImage]),
            });
          } catch (e: any) {
            console.error(e.stack || e.message || e);
            enqueueSnackbar(
              locale(
                (e.message || e.stack || "Error occured").substring(0, 312)
              ),
              {
                variant: "error",
              }
            );
          }
          if (success) {
            mutateArticle(articleDraft);
          }
        } catch (e: any) {
          console.error(e.stack || e.message || e);
          enqueueSnackbar(
            locale((e.message || e.stack || "Error occured").substring(0, 312)),
            {
              variant: "error",
            }
          );
        }
      }}
    >
      <TabsProvider>
        <ArticleEventsProvider providerRef={providerRef}>
          <Grid container spacing={1}>
            <Grid
              item
              xs={12}
              md={12}
              lg={2}
              xl={1}
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
                spacing={0}
                direction={{ xs: "row", lg: "column" }}
                justifyContent={"flex-end"}
                flexWrap={"wrap"}
                sx={{
                  position: "sticky",
                  top: { xs: 0, lg: "5px" },
                  gap: "6px",
                }}
              >
                <SubmitButton startIcon={<SaveIcon />}>Сохранить</SubmitButton>
                <ResetButton />
                <OpenCodemirrorButton />
                <ToggleTinyMceFullscreen />
              </Stack>
            </Grid>
            <Grid item xs={12} md={12} lg={10} xl={11} order={{ xs: 2, lg: 1 }}>
              <Container
                maxWidth="lg"
                sx={{
                  float: { xs: "none", lg: "right" },
                  "&&": { px: 0, py: 0 },
                }}
              >
                <ArticleTabs article={article} />
              </Container>
            </Grid>
          </Grid>
        </ArticleEventsProvider>
      </TabsProvider>
    </RefFormik>
  );
});

export default ChildArticleForm;
