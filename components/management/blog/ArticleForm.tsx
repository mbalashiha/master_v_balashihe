import React, { useCallback } from "react";
import { useState, useRef, useContext, useMemo, ReactNode } from "react";
import { CMS } from "@common/types";
import { useRouter } from "next/router";
import { Blog } from "@common/types/cms";
import ChildArticleForm from "./ChildArticleForm";
import { Box, Paper } from "@mui/material";
import EventEmitter from "events";
import { FormContextType } from "@components/ui/RefFormik";
import { FormikValues } from "formik";

export interface ArticleMutationContext {
  mutateArticle: (article: Blog.ArticleDraft) => void;
  savedArticle: Blog.ArticleDraft;
  emitter: EventEmitter;
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
  const [article, setSavedArticle] =
    React.useState<Blog.ArticleDraft>(inArticle);
  const [emitter, createEmitter] = useState(new EventEmitter());
  const [savedFlag, setSavedFlag] = React.useState<boolean>(false);
  const articleRef = useRef({ article, router });
  articleRef.current = { article, router };
  const mutateArticle = useCallback(
    (newSavedArticle: Blog.ArticleDraft) => {
      const { article, router } = articleRef.current;
      setSavedFlag(true);
      setSavedArticle(newSavedArticle);
      emitter.emit("tinymce", newSavedArticle.textHtml);
      if (typeof formRef.current?.updateFormValues !== "function") {
        alert("formRef.current?.updateFormValues is not a function!");
      }
      formRef.current?.updateFormValues(article);
      if (article.existingArticleId !== newSavedArticle.existingArticleId) {
        router.push({
          pathname: `/management/blog/article/edit/[articleId]`,
          query: {
            articleId: newSavedArticle.existingArticleId,
          },
        });
      } else {
        setTimeout(() => setSavedFlag(false), 1500);
      }
    },
    [emitter]
  );
  const value = useMemo(
    () => ({ emitter, savedArticle: article, mutateArticle }),
    [emitter, article, mutateArticle]
  );
  return (
    <ArticleMutationContext.Provider value={value}>
      {savedFlag && (
        <Paper sx={{ mt: 15, p: 10, width: "100%", textAlign: "center" }}>
          <h1>Статья сохранена</h1>
        </Paper>
      )}
      <Box width="100%" sx={{ display: savedFlag ? "none" : "inherit" }}>
        <ChildArticleForm ref={formRef as any} article={article} />
      </Box>
    </ArticleMutationContext.Provider>
  );
};

export const useArticleContext = () => {
  return useContext(ArticleMutationContext) as ArticleMutationContext;
};
