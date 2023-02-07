import { CMS } from "@common/types";
import { Schema } from "@framework/types";
import { normalizeArticle } from "@framework/utils/normalize";

export const normalizeArticleDraft = (
  draft: Schema.ArticleDraft
): CMS.Blog.ArticleDraft => {
  const {
    id,
    title,
    handle,
    autoHandleSlug,
    text,
    textHtml,
    textRawDraftContentState,
    published,
    orderNumber,
    blogCategoryId,
    createdAt,
    updatedAt,
    publishedAt,
    existingArticleId,
    existingArticle,
  } = draft;
  return {
    id,
    title: title || "",
    handle: handle || "",
    autoHandleSlug: autoHandleSlug || "",
    text: text || "",
    textHtml: textHtml || "",
    textRawDraftContentState: textRawDraftContentState || null,
    published,
    orderNumber,
    blogCategoryId,
    createdAt,
    updatedAt,
    publishedAt,
    existingArticleId,
    existingArticle: existingArticle ? normalizeArticle(existingArticle) : null,
  };
};
