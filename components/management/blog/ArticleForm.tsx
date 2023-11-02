import React, { useCallback } from "react";
import { useState, useRef, useContext, useMemo, ReactNode } from "react";
import { CMS } from "@common/types";
import { useRouter } from "next/router";
import { Blog } from "@common/types/cms";
import ChildArticleForm from "./ChildArticleForm";
import { Box, Container, Fab, Paper } from "@mui/material";
import EventEmitter from "events";
import { FormContextType } from "@components/ui/RefFormik";
import { FormikProps, FormikValues } from "formik";
import { FabButtons } from "./FabButtons";

export interface ArticleMutationContext<FormValues> {
  mutateArticle: (article: FormValues) => void;
  savedArticle: FormValues;
  resetArticle: () => void;
  emitter: EventEmitter;
  eventNames: {
    openCodeMirror: string;
    ARTICLE_TEXTHTML_SET_CONTENT: string;
  };
}
const ArticleMutationContext = React.createContext<
  Partial<ArticleMutationContext<Blog.ArticleDraft>>
>({});

interface Props {
  article: Blog.ArticleDraft;
}
export const ArticleForm = ({ article: inArticle }: Props) => {
  const formRef = useRef<FormContextType<Blog.ArticleDraft>>();
  const router = useRouter();
  const [stateArticle, setArticle] =
    React.useState<Blog.ArticleDraft>(inArticle);
  const [emitter, createEmitter] = useState(new EventEmitter());
  const [savedFlag, setSavedFlag] = React.useState<boolean>(false);
  const articleRef = useRef({ stateArticle, router });
  articleRef.current = { stateArticle, router };
  const eventNames = useMemo(
    () => ({
      openCodeMirror: "textHtml-codemirror-editor-open",
      ARTICLE_TEXTHTML_SET_CONTENT: "tinymce_ARTICLE_TEXTHTML_SET_CONTENT",
    }),
    []
  );
  const resetArticle = useCallback(() => {
    // const { stateArticle, router } = articleRef.current;
    emitter.emit(
      eventNames.ARTICLE_TEXTHTML_SET_CONTENT,
      formRef.current?.initialValues?.textHtml || ""
    );
    return formRef.current?.resetForm();
  }, [emitter, eventNames.ARTICLE_TEXTHTML_SET_CONTENT]);
  const mutateArticle = useCallback(
    (newSavedArticle: Blog.ArticleDraft) => {
      const { stateArticle, router } = articleRef.current;
      setSavedFlag(true);
      setArticle(newSavedArticle);
      emitter.emit(
        eventNames.ARTICLE_TEXTHTML_SET_CONTENT,
        newSavedArticle.textHtml
      );
      formRef.current?.setValues(newSavedArticle);
      if (
        stateArticle.existingArticleId !== newSavedArticle.existingArticleId
      ) {
        router.push({
          pathname: `/management/blog/article/edit/[articleId]`,
          query: {
            articleId: newSavedArticle.existingArticleId,
          },
        });
      } else {
        setTimeout(() => {
          setSavedFlag(false);
        }, 900);
      }
    },
    [emitter, eventNames]
  );
  const value: ArticleMutationContext<Blog.ArticleDraft> = useMemo(
    () => ({
      emitter,
      eventNames,
      savedArticle: stateArticle,
      mutateArticle,
      resetArticle,
    }),
    [emitter, eventNames, stateArticle, mutateArticle, resetArticle]
  );
  return (
    <ArticleMutationContext.Provider value={value}>
      <FabButtons />
      <Container maxWidth="xl">
        {savedFlag && (
          <Paper sx={{ mt: 15, p: 10, width: "100%", textAlign: "center" }}>
            <h1>Статья сохранена</h1>
          </Paper>
        )}
        <Box width="100%" sx={{ display: savedFlag ? "none" : "inherit" }}>
          <ChildArticleForm ref={formRef as any} article={stateArticle} />
        </Box>
      </Container>
    </ArticleMutationContext.Provider>
  );
};

export const useArticleContext = () => {
  return useContext(
    ArticleMutationContext
  ) as ArticleMutationContext<Blog.ArticleDraft>;
};
