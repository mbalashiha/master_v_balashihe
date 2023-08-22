import { Dialog, useField, useRefFormik } from "@components/ui";
import { TextField } from "@mui/material";
import useSaveArtDraftProps from "@framework/management/blog/article/draft/use-save-draft-props";
import useCheckArticle from "@framework/management/blog/article/draft/use-check-article";
import React from "react";
import { Blog } from "@common/types/cms";
import { useRouter } from "next/router";
import { CMS } from "@common/types";
import { useArticleContext } from "./ArticleProvider";

export const ArticleTitle = () => {
  const [field, meta] = useField<string>("title");
  const saveDraft = useSaveArtDraftProps();
  const onBlur = field.onBlur;
  const checkArticle = useCheckArticle();
  const router = useRouter();
  const { getValues } = useRefFormik<CMS.Blog.ArticleDraft>();
  const { setDuplicateArticle } = useArticleContext();
  return (
    <>
      <TextField
        label="Заголовок статьи"
        required
        sx={{ width: "100%", height: "71px" }}
        variant="filled"
        error={!!meta.error}
        helperText={meta.error}
        {...field}
        onBlur={async (ev, ...rest) => {
          const article = await checkArticle({
            title: ev.target.value,
            handle: "",
          });
          if (article && article.id != getValues()?.existingArticleId) {
            setDuplicateArticle(article);
          }
          return onBlur(ev, ...rest);
        }}
      ></TextField>
    </>
  );
};
export default ArticleTitle;
