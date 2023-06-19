import React, { useCallback } from "react";
import { useState, useRef, useContext, useMemo, ReactNode } from "react";
import dynamic from "next/dynamic";
import { CMS } from "@common/types";
import { Dialog } from "@components/ui";
import useSaveArticleText from "@framework/management/blog/article/draft/use-save-article-text";
import { useRefFormik } from "@components/ui";
import { useRouter } from "next/router";
import useSaveArtDraftProps from "@framework/management/blog/article/draft/use-save-draft-props";
import useSaveArticleKeyText from "@framework/management/blog/article/draft/use-save-article-key-text";

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
  const saveDraftProps = useSaveArtDraftProps();
  const saveKeyText = useSaveArticleKeyText();
  const formRef = useRef<{
    form: typeof form;
    saveArticleTextDraft: typeof saveArticleTextDraft;
    saveDraftProps: typeof saveDraftProps;
    saveKeyText: typeof saveKeyText;
  }>({ form, saveArticleTextDraft, saveDraftProps, saveKeyText });
  formRef.current = {
    ...formRef.current,
    form,
    saveArticleTextDraft,
    saveKeyText,
  };
  const editorRef = useRef<any>(null);
  React.useEffect(() => {
    const beforeunloadListener = async () => {
      const { saveArticleTextDraft, saveDraftProps, saveKeyText } =
        formRef.current;
      await saveArticleTextDraft({});
      await saveDraftProps({});
      await saveKeyText({});
    };
    window.addEventListener("beforeunload", beforeunloadListener, false);
    window.addEventListener("blur", beforeunloadListener);
    return () => {
      window.removeEventListener("beforeunload", beforeunloadListener);
      window.removeEventListener("blur", beforeunloadListener);
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
