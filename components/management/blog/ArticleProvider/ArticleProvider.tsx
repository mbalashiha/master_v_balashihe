import React, { useCallback } from "react";
import { useState, useRef, useContext, useMemo, ReactNode } from "react";
import dynamic from "next/dynamic";
import { CMS } from "@common/types";
import useSaveArticleText from "@framework/management/blog/article/draft/use-save-article-text";
import { useRefFormik } from "@components/ui";

interface ContextType {
  editorRef: React.MutableRefObject<any>;
}
const ArticleContext = React.createContext<Partial<ContextType>>({});
interface Props {
  children: React.ReactNode | React.ReactNode[];
}
export const ArticleProvider = ({ children }: Props) => {
  const form = useRefFormik<CMS.Blog.ArticleDraft>();
  const saveArticleTextDraft = useSaveArticleText();
  const formRef = useRef<{
    form: typeof form;
    saveArticleTextDraft: typeof saveArticleTextDraft;
  }>({ form, saveArticleTextDraft });
  formRef.current = { ...formRef.current, form, saveArticleTextDraft };
  const editorRef = useRef<any>(null);
  React.useEffect(() => {
    const beforeunloadListener = async () => {
      const { saveArticleTextDraft } = formRef.current;
      await saveArticleTextDraft({});
    };
    window.addEventListener("beforeunload", beforeunloadListener, false);
    window.addEventListener("blur", beforeunloadListener);
    return () => {
      window.removeEventListener("beforeunload", beforeunloadListener);
      window.removeEventListener("blur", beforeunloadListener);
    };
  }, []);
  const providerConfig = useMemo(() => {
    return { editorRef };
  }, []);
  return (
    <ArticleContext.Provider value={providerConfig}>
      {children}
    </ArticleContext.Provider>
  );
};

export const useArticleContext = () => {
  return useContext(ArticleContext) as ContextType;
};
