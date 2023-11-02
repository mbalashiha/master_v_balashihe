import React, { useCallback } from "react";
import { useState, useRef, useContext, useMemo, ReactNode } from "react";
import { CMS } from "@common/types";
import { useRouter } from "next/router";
import { Blog } from "@common/types/cms";
import ChildArticleForm from "./ChildArticleForm";
import { Box, Container, Fab, Paper } from "@mui/material";
import EventEmitter from "events";
import { FormContextType } from "@components/ui/RefFormik";
import { FormikValues } from "formik";
import { FabButtons } from "./FabButtons";

export interface ArticleMutationContext {
  mutateArticle: (article: Blog.ArticleDraft) => void;
  savedArticle: Blog.ArticleDraft;
  emitter: EventEmitter;
  eventNames: {
    openCodeMirror: string;
    articleTextHtmlSetContent: string;
  };
}
const ArticleMutationContext = React.createContext<
  Partial<ArticleMutationContext>
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
      articleTextHtmlSetContent: "tinymce",
    }),
    []
  );
  const mutateArticle = useCallback(
    (newSavedArticle: Blog.ArticleDraft) => {
      const { stateArticle, router } = articleRef.current;
      setSavedFlag(true);
      setArticle(newSavedArticle);
      emitter.emit(
        eventNames.articleTextHtmlSetContent,
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
  const value = useMemo(
    () => ({ emitter, eventNames, savedArticle: stateArticle, mutateArticle }),
    [emitter, eventNames, stateArticle, mutateArticle]
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
  return useContext(ArticleMutationContext) as ArticleMutationContext;
};
