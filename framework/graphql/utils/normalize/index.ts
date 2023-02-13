import { CMS } from "@common/types";
import { Blog } from "@common/types/cms";
import { Schema } from "@framework/types";

export const normalizeArticle = (data: Schema.BlogArticle): Blog.Article => {
  const {
    articleId,
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
  return {
    articleId,
    title,
    url: `/${handle}`,
    textHtml,
    published,
    orderNumber,
    category,
    createdAt,
    updatedAt,
    publishedAt,
    breadcrumbs,
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
