import { CMS } from "@common/types";
import { Schema } from "@framework/types";
import {
  normalizeArticle,
  normalizeArticleUrl,
} from "@framework/utils/normalize/article";

export const normalizeArticleDraft = (
  draft: Schema.Article.ArticleDraft
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
  const url = existingArticleId
    ? normalizeArticleUrl(handle, autoHandleSlug)
    : null;
  return {
    id,
    title: title || "",
    handle: handle || "",
    autoHandleSlug: autoHandleSlug || "",
    url,
    text: text || "",
    textHtml: textHtml || "",
    textRawDraftContentState: textRawDraftContentState || null,
    published: Boolean(published),
    orderNumber: orderNumber || null,
    blogCategoryId: blogCategoryId || null,
    createdAt,
    updatedAt,
    publishedAt,
    existingArticleId,
    isCreatePage: !Boolean(existingArticleId && existingArticle),
    existingArticle: existingArticle ? normalizeArticle(existingArticle) : null,
  };
};
