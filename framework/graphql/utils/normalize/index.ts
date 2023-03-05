import { CMS } from "@common/types";
import { Blog } from "@common/types/cms";
import { Schema } from "@framework/types";

export const normalizeArticleUrl = (
  handle: string | null,
  autoHandleSlug?: string | null
): string | null => {
  handle = handle || autoHandleSlug || null;
  if (!handle) {
    return null;
  } else {
    return `/uslugi-mastera-v-balashihe/${handle}`;
  }
};
export const normalizeBlogRow = (
  data: Schema.BlogArticleCard
): Blog.ArticleCard => {
  const { title, handle, createdAt, score, fragment } = data;
  const url = handle ? normalizeArticleUrl(handle) : null;
  return {
    score: typeof score === "number" || score ? score : null,
    fragment: fragment || null,
    title,
    url: url || `/${handle}`,
    createdAt: new Date(createdAt).toLocaleString("ru", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }),
  };
};
export const normalizeArticle = (data: Schema.BlogArticle): Blog.Article => {
  const {
    id,
    title,
    handle,
    text,
    textHtml,
    published,
    orderNumber,
    category,
    createdAt,
    updatedAt,
    publishedAt,
    breadcrumbs,
  } = data;
  if (!id) {
    throw new Error("No id in article row!");
  }
  const url = id ? normalizeArticleUrl(handle) : null;
  return {
    id,
    title,
    url: url || `/${handle}`,
    textHtml,
    published,
    orderNumber,
    category: {
      ...category,
    },
    createdAt,
    updatedAt,
    publishedAt,
    breadcrumbs: {
      ...breadcrumbs,
    },
  };
};

export const normalizeArticles = (
  data: Schema.Response.BlogArticles
): Blog.Article[] => {
  const {
    blogArticles: { nodes: articles },
  } = data;
  return articles.map((node) => normalizeArticle(node));
};
export const normalizeImage = (data: Schema.Image): CMS.Image => {
  const {
    imageId,
    imgSrc,
    altText,
    height,
    width,
    orderNumber,
    originalWidth,
    originalHeight,
    pathOfOriginal,
    createdAt,
    updatedAt,
  } = data;
  return {
    url: imgSrc,
    alt: altText,
    height,
    width,
    orderNumber: orderNumber || null,
    originalWidth,
    originalHeight,
    createdAt,
    updatedAt,
  };
};
