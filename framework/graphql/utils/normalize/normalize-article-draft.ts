import { CMS } from "@common/types";
import { ID, Schema } from "@framework/types";
import {
  getCanonicalUrl,
  normalizeArticle,
  normalizeArticleUrl,
  normalizeImage,
} from "@framework/utils/normalize/normalize-article";
import { slugify } from "@lib/slugify";

import convertDate from "./convert-date";
export const getEmptyDraft = ({
  templateId,
}: {
  templateId?: ID | null;
}): CMS.Blog.ArticleDraft => {
  return {
    existingArticleId: null,
    existingArticle: null,
    id: null,
    title: "",
    url: "",
    absURL: "",
    textHtml: "",
    keyTextHtml: "",
    textRawDraftContentState: null,
    text: "",
    h2: "",
    unPublished: false,
    notSearchable: false,
    notInList: false,
    blogCategoryId: null,
    handle: "",
    createdAt: null,
    updatedAt: null,
    publishedAt: null,
    imageId: null,
    image: null,
    secondImageId: null,
    secondImage: null,
    templateId: templateId || null,
    orderNumber: null,
    description: "",
    autoHandleSlug: "",
  };
};
export const normalizeArticleDraft = (
  draft: Schema.Article.ArticleDraft
): CMS.Blog.ArticleDraft => {
  let {
    id,
    title,
    handle,
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
    templateId,
    description,
  } = draft;
  if (!existingArticleId) {
    return getEmptyDraft({ templateId });
  }
  const url = existingArticleId ? normalizeArticleUrl(handle) : null;
  const normalizedDraft = {
    id,
    title: title || "",
    handle: handle || "",
    url,
    absURL: absURL ? `/${absURL}` : "",
    canonicalUrl: url ? getCanonicalUrl(url) : "",
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
    templateId: templateId || null,
    description: description || "",
    autoHandleSlug: slugify(title || ""),
  };
  return normalizedDraft;
};
