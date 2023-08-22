import React, { useCallback } from "react";
import { useState, useRef, useContext, useMemo, ReactNode } from "react";
import { CMS } from "@common/types";
import { Dialog } from "@components/ui";
import useSaveArticleText from "@framework/management/blog/article/draft/use-save-article-text";
import { useRefFormik } from "@components/ui";
import { useRouter } from "next/router";

export interface ArticleEditorContext {
  editorRef: React.MutableRefObject<any>;
  setDuplicateArticle: (duplicateArticle: CMS.Blog.Article | undefined) => void;
  duplicateArticle: CMS.Blog.Article | undefined;
}
const ArticleContext = React.createContext<Partial<ArticleEditorContext>>({});
interface Props {
  children: React.ReactNode | React.ReactNode[];
  providerRef?: React.MutableRefObject<ArticleEditorContext | undefined>;
}
export const ArticleProvider = ({ children, providerRef }: Props) => {
  const router = useRouter();
  const form = useRefFormik<CMS.Blog.ArticleDraft>();
  const saveArticleTextDraft = useSaveArticleText();
  const formRef = useRef<{
    form: typeof form;
    saveArticleTextDraft: typeof saveArticleTextDraft;
  }>({ form, saveArticleTextDraft });
  formRef.current = {
    ...formRef.current,
    form,
    saveArticleTextDraft,
  };
  const editorRef = useRef<any>(null);
  React.useEffect(() => {
    const beforeunloadListener = async () => {
      const { saveArticleTextDraft } =
        formRef.current;
      await saveArticleTextDraft({});
    };
    window.addEventListener("beforeunload", beforeunloadListener, false);
    window.addEventListener("blur", beforeunloadListener);
    return () => {
      window.removeEventListener("beforeunload", beforeunloadListener);
      window.removeEventListener("blur", beforeunloadListener);
      beforeunloadListener();
    };
  }, []);
  const [duplicateArticle, setDuplicateArticle] = React.useState<
    CMS.Blog.Article | undefined
  >();
  const providerConfig = { editorRef, duplicateArticle, setDuplicateArticle };
  if (providerRef) {
    providerRef.current = providerConfig;
  }
  return (
    <ArticleContext.Provider value={providerConfig}>
      {duplicateArticle && (
        <Dialog
          isOpen={Boolean(duplicateArticle)}
          onClose={() => setDuplicateArticle(undefined)}
          confirmCaption="К старой статье"
          onConfirm={() => {
            router.push({
              pathname: `/management/blog/article/edit/[articleId]`,
              query: {
                articleId: duplicateArticle.id,
              },
            });
          }}
          message={`Статья с именем "${duplicateArticle.title}" уже существуют. Перейти к редактированию старой статьи?`}
        />
      )}
      {children}
    </ArticleContext.Provider>
  );
};

export const useArticleContext = () => {
  return useContext(ArticleContext) as ArticleEditorContext;
};
