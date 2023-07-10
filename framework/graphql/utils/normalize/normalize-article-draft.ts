import { CMS } from "@common/types";
import { Schema } from "@framework/types";
import {
  normalizeArticle,
  normalizeArticleUrl,
  normalizeImage,
} from "@framework/utils/normalize/normalize-article";
import convertDate from "./convert-date";

export const normalizeArticleDraft = (
  draft: Schema.Article.ArticleDraft
): CMS.Blog.ArticleDraft => {
  let {
    id,
    title,
    handle,
    autoHandleSlug,
    absURL,
    text,
    textHtml,
    textRawDraftContentState,
    keyTextHtml,
    h2,
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
    secondImageId,
    secondImage,
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
    h2: h2 || "",
    unPublished: Boolean(unPublished),
    notSearchable: Boolean(notSearchable),
    notInList: Boolean(notInList),
    orderNumber: orderNumber || null,
    blogCategoryId: blogCategoryId || null,
    createdAt: createdAt || null,
    updatedAt: updatedAt || null,
    publishedAt: convertDate(publishedAt),
    existingArticleId,
    isCreatePage: !Boolean(existingArticleId && existingArticle),
    existingArticle: existingArticle ? normalizeArticle(existingArticle) : null,
    imageId: imageId || null,
    image: image ? normalizeImage(image) : null,
    secondImageId: secondImageId || null,
    secondImage: secondImage ? normalizeImage(secondImage) : null,
  };
  return normalizedDraft;
};
