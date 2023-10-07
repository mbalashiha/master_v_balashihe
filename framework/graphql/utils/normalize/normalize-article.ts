import { CMS } from "@common/types";
import { Blog } from "@common/types/cms";
import { ID, Schema } from "@framework/types";
import convertDate from "./convert-date";

export const getCanonicalUrl = ({ url }: { url: string }) =>
  `${process.env["NEXT_PUBLIC_SITE_URL"] || ""}${
    url.startsWith("/") ? url : `/${url}`
  }`;

export const normalizeArticleUrl = (
  handle: string | null,
  autoHandleSlug?: string | null
): string => {
  handle = handle || autoHandleSlug || null;
  if (!handle) {
    return "";
  } else {
    if (handle.startsWith("/")) {
      return handle;
    }
    return `/uslugi-mastera-v-balashihe/${handle}`;
  }
};
export const normalizeBlogRow = (
  data: Schema.ArticleCard
): Blog.ArticleCard => {
  const {
    id,
    title,
    handle,
    absURL,
    publishedAt,
    score,
    fragment,
    displayingPageHandle,
    image,
    secondImage,
    viewed,
  } = data;
  const url = absURL || handle ? normalizeArticleUrl(absURL || handle) : "";
  return {
    id: id || (null as any as ID),
    image: image && image.imgSrc ? normalizeImage(image) : null,
    secondImage:
      secondImage && secondImage.imgSrc ? normalizeImage(secondImage) : null,
    score: typeof score === "number" || score ? score : null,
    fragment: fragment || null,
    title,
    url,
    displayingPageUrl: displayingPageHandle || null,
    publishedAt: new Date(publishedAt).toLocaleString("ru", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }),
    viewed: viewed || null,
  };
};
export const normalizeArtNavItem = (
  item: Schema.NavigationItem
): Blog.NavigationItem => {
  item = item || {};
  const { title, handle, itIsloop, image } = item;
  const url = (handle && normalizeArticleUrl(handle)) || "";
  return {
    title: (title || "").replace(/[\.!]+\s*/gim, " ").trim(),
    url,
    active: handle === "" ? true : null,
    itIsloop: Boolean(itIsloop),
    image: image && image.imgSrc ? normalizeImage(image) : null,
  };
};
const normalizeArticleNavigationItems = (
  nav: Schema.ArticleNavigation | null
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
export const chooseArticleUrl = ({
  displayingPageHandle,
  handle,
}: {
  displayingPageHandle: string | null;
  handle: string | null;
}): string => {
  let url: string = displayingPageHandle || handle || "";
  if (url && !url.startsWith("/")) {
    url = normalizeArticleUrl(url) || "";
  }
  return url;
};
export const normalizeArticle = (data: Schema.Article): Blog.Article => {
  let {
    id,
    title,
    handle,
    absURL,
    displayingPageHandle,
    text,
    textHtml,
    renderHtml,
    keyTextHtml,
    h2,
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
    secondImageId,
    secondImage,
    randomImage,
    viewed,
    templateId,
    blogCategoryId,
    autoHandleSlug,
  } = data;
  if (!id) {
    throw new Error("No id in article row!");
  }
  if (!process.env["NEXT_PUBLIC_SITE_URL"]) {
    throw new Error("No NEXT_PUBLIC_SITE_URL for canonical url!");
  }
  const url = chooseArticleUrl({ displayingPageHandle, handle });
  const canonicalUrl = getCanonicalUrl({ url: absURL || url });
  return {
    id,
    title,
    url,
    canonicalUrl,
    absURL: absURL || "",
    navigation: normalizeArticleNavigationItems(navigation),
    textHtml: textHtml || renderHtml || "",
    renderHtml: renderHtml || "",
    keyTextHtml: keyTextHtml || "",
    h2: h2 || "",
    unPublished: Boolean(unPublished),
    notSearchable: Boolean(notSearchable),
    notInList: Boolean(notInList),
    orderNumber,
    category: {
      ...category,
    },
    createdAt: createdAt || null,
    updatedAt: updatedAt || null,
    publishedAt: convertDate(publishedAt),
    breadcrumbs: {
      ...breadcrumbs,
    },
    imageId: imageId || null,
    image: image && image.imgSrc ? normalizeImage(image) : null,
    randomImage:
      randomImage && randomImage.imgSrc ? normalizeImage(randomImage) : null,
    secondImageId: secondImageId || null,
    secondImage:
      secondImage && secondImage.imgSrc ? normalizeImage(secondImage) : null,
    viewed: viewed || null,
    templateId: templateId || null,
    blogCategoryId: blogCategoryId || null,
    autoHandleSlug: autoHandleSlug || null,
    handle: handle || null,
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
  const url = imgSrc.startsWith("/") ? imgSrc : `/${imgSrc}`;
  const canonicalUrl = getCanonicalUrl({ url });
  return {
    imageId: imageId || "",
    url,
    canonicalUrl,
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
