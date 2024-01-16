import React from "react";
import {
  useState,
  useCallback,
  useRef,
  useContext,
  useMemo,
  ReactNode,
} from "react";
import { Editor } from "@tinymce/tinymce-react";
import { CMS } from "@common/types";
import { Dialog } from "@components/ui";
import useSaveArticleText from "@framework/management/blog/article/draft/use-save-article-text";
import { useRouter } from "next/router";
import { useFormikContext } from "formik";
import { TinyMCEImperativeRef } from "@components/management/TinyMCE/MemozedTinyMCE/MemozedTinyMCE";

export interface ArticleEventsContext {
  keydownListener: (event: KeyboardEvent) => void;
  editorRef: React.MutableRefObject<TinyMCEImperativeRef | null>;
  setDuplicateArticle: (duplicateArticle: CMS.Blog.Article | undefined) => void;
  duplicateArticle: CMS.Blog.Article | undefined;
}
const ArticleEventsContext = React.createContext<Partial<ArticleEventsContext>>(
  {}
);
interface Props {
  children: React.ReactNode | React.ReactNode[];
  providerRef?: React.MutableRefObject<ArticleEventsContext | undefined>;
}
export const ArticleEventsProvider = ({ children, providerRef }: Props) => {
  const router = useRouter();
  // const form = useRefFormik<CMS.Blog.ArticleDraft>();
  const form = useFormikContext();
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
  const editorRef = useRef(
    null
  ) as React.MutableRefObject<TinyMCEImperativeRef | null>;
  /*React.useEffect(() => {
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
  }, []);*/

  const keydownListener = useCallback((event: KeyboardEvent) => {
    if (event.ctrlKey && event.code === "KeyS") {
      event.preventDefault();
      const { form } = formRef.current;
      form.submitForm();
    }
  }, []);
  React.useEffect(() => {
    document.addEventListener("keydown", keydownListener);
    return () => {
      document.removeEventListener("keydown", keydownListener);
    };
  }, [keydownListener]);
  const [duplicateArticle, setDuplicateArticle] = React.useState<
    CMS.Blog.Article | undefined
  >();
  const providerConfig = {
    keydownListener,
    editorRef,
    duplicateArticle,
    setDuplicateArticle,
  };
  if (providerRef) {
    providerRef.current = providerConfig;
  }
  return (
    <ArticleEventsContext.Provider value={providerConfig}>
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
    </ArticleEventsContext.Provider>
  );
};

export const useArticleEvents = () => {
  return useContext(ArticleEventsContext) as ArticleEventsContext;
};
