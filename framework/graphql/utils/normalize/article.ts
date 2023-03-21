import { CMS } from "@common/types";
import { Blog } from "@common/types/cms";
import { ID, Schema } from "@framework/types";
import util from "util";

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
  const { id, title, handle, createdAt, score, fragment } = data;
  const url = handle ? normalizeArticleUrl(handle) : null;
  return {
    id: id || (null as any as ID),
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
const normalizeArtNavItem = (
  item: Schema.NavigationItem
): Blog.NavigationItem => {
  item = item || {};
  const { title, handle, itIsloop } = item;
  const url = (handle && normalizeArticleUrl(handle)) || "";
  return {
    title: title || "",
    url,
    active: handle === "" ? true : null,
    itIsloop: Boolean(itIsloop),
  };
};
const normalizeArticleNavigationItems = (
  nav: Schema.BlogArticleNavigation | null
): Blog.BlogArticleNavigation => {
  if (!nav) {
    return {
      prev: null,
      next: null,
      nearestSiblings: null,
    };
  }
  const prev = (nav.prev && normalizeArtNavItem(nav.prev)) || null;
  const next = (nav.next && normalizeArtNavItem(nav.next)) || null;
  const nearestSiblings =
    (nav.nearestSiblings &&
      nav.nearestSiblings.map((item: any) => normalizeArtNavItem(item))) ||
    null;
  return {
    prev,
    next,
    nearestSiblings,
  };
};
export const normalizeArticle = (data: Schema.BlogArticle): Blog.Article => {
  const {
    id,
    title,
    handle,
    absURL,
    text,
    textHtml,
    renderHtml,
    unPublished,
    notSearchable,
    notInList,
    orderNumber,
    category,
    createdAt,
    updatedAt,
    publishedAt,
    breadcrumbs,
    navigation,
    imageId,
    image,
  } = data;
  if (!id) {
    throw new Error("No id in article row!");
  }
  const url = id ? normalizeArticleUrl(handle) : null;
  return {
    id,
    title,
    url: url || `/${handle}`,
    absURL: !absURL ? "" : absURL.startsWith("/") ? absURL : `/${absURL}`,
    navigation: normalizeArticleNavigationItems(navigation),
    textHtml: textHtml || renderHtml || "",
    renderHtml: renderHtml || "",
    unPublished: Boolean(unPublished),
    notSearchable: Boolean(notSearchable),
    notInList: Boolean(notInList),
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
    imageId: imageId || null,
    image: image ? normalizeImage(image) : null,
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
    imageId: imageId || "",
    url: imgSrc.startsWith("/") ? imgSrc : `/${imgSrc}`,
    alt: altText || "",
    height: height && height > 0 ? height : 1,
    width: width && width > 0 ? width : 1,
    orderNumber: orderNumber || null,
    originalWidth: originalWidth || null,
    originalHeight: originalHeight || null,
    createdAt: createdAt || null,
    updatedAt: updatedAt || null,
  };
};
