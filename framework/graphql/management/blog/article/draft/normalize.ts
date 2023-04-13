import { CMS } from "@common/types";
import { Schema } from "@framework/types";
import {
  normalizeArticle,
  normalizeArticleUrl,
  normalizeImage,
} from "@framework/utils/normalize/article";

export const normalizeArticleDraft = (
  draft: Schema.Article.ArticleDraft
): CMS.Blog.ArticleDraft => {
  const {
    id,
    title,
    handle,
    autoHandleSlug,
    absURL,
    text,
    textHtml,
    textRawDraftContentState,
    keyTextHtml,
    unPublished,
    notSearchable,
    notInList,
    orderNumber,
    blogCategoryId,
    createdAt,
    updatedAt,
    publishedAt,
    existingArticleId,
    existingArticle,
    imageId,
    image,
  } = draft;
  const url = existingArticleId
    ? normalizeArticleUrl(handle, autoHandleSlug)
    : null;
  const normalizedDraft = {
    id,
    title: title || "",
    handle: handle || "",
    autoHandleSlug: autoHandleSlug || "",
    url,
    absURL: absURL || "",
    text: text || "",
    textHtml: textHtml || "",
    textRawDraftContentState: textRawDraftContentState || null,
    keyTextHtml: keyTextHtml || "",
    unPublished: Boolean(unPublished),
    notSearchable: Boolean(notSearchable),
    notInList: Boolean(notInList),
    orderNumber: orderNumber || null,
    blogCategoryId: blogCategoryId || null,
    createdAt,
    updatedAt,
    publishedAt,
    existingArticleId,
    isCreatePage: !Boolean(existingArticleId && existingArticle),
    existingArticle: existingArticle ? normalizeArticle(existingArticle) : null,
    imageId: imageId || null,
    image: image ? normalizeImage(image) : null,
  };
  return normalizedDraft;
};
