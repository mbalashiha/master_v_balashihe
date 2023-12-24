import { CMS } from "@common/types";
import { Blog, Image } from "@common/types/cms";
import { ID, Schema } from "@framework/types";
import convertDate from "./convert-date";
import { DateTime } from "luxon";
import humanizeDuration from "humanize-duration";
import { NEXT_PUBLIC_SITE_ORIGIN } from "@framework/const";

export const getCanonicalUrl = (url: string) =>
  `${NEXT_PUBLIC_SITE_ORIGIN}${url}`;

function readingTime(text: string, wordsPerMinute: number = 200): string {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return humanizeDuration(minutes * 60 * 1000, { language: "ru" });
}
export const getArticleUrlAndCanonicalUrl = ({
  absURL,
  handle,
}: {
  absURL: string | null;
  handle: string | null;
}): {
  url: string;
  canonicalUrl: string;
} => {
  const url = chooseArticleUrl({ handle });
  if (absURL && !absURL.startsWith("/")) {
    absURL = `/${absURL}`;
  }
  const canonicalUrl = getCanonicalUrl(absURL ? absURL : url);
  return { url, canonicalUrl };
};
export const normalizeArticleUrl = (
  handle: string | null,
  absURL?: string | null
): string => {
  handle = handle || absURL || null;
  if (!handle) {
    return "";
  } else return `/${handle}`;
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
    image,
    secondImage,
    viewed,
    description,
    datePublishedISO,
    dateModifiedISO,
    modifiedDate,
    publishedDate,
  } = data;

  if (!datePublishedISO) {
    throw new Error("No article datePublished!");
  }
  if (!dateModifiedISO) {
    throw new Error("No article dateModified!");
  }
  const { url, canonicalUrl } = getArticleUrlAndCanonicalUrl({
    handle,
    absURL,
  });
  return {
    id: id || (null as any as ID),
    image: image && image.imgSrc ? normalizeImage(image) : null,
    secondImage:
      secondImage && secondImage.imgSrc ? normalizeImage(secondImage) : null,
    score: typeof score === "number" || score ? score : null,
    fragment: fragment || null,
    title,
    url,
    canonicalUrl,
    publishedAt: new Date(publishedAt).toLocaleString("ru", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }),
    humanDates: {
      datePublished: DateTime.fromISO(datePublishedISO)
        .setLocale("ru")
        .toLocaleString(DateTime.DATE_FULL),
      dateModified: DateTime.fromISO(dateModifiedISO)
        .setLocale("ru")
        .toLocaleString(DateTime.DATE_FULL),
    },
    viewed: viewed || null,
    description: description || "",
    datePublishedISO,
    dateModifiedISO,
    modifiedDate: modifiedDate || "",
    publishedDate: publishedDate || "",
  };
};
export const normalizeArtNavItem = (
  item: Schema.NavigationItem
): Blog.NavigationItem => {
  item = item || {};
  const { title, handle, itIsloop, image, viewed, modifiedDate } = item;
  const url = (handle && normalizeArticleUrl(handle)) || "";
  return {
    title: (title || "").replace(/[\.!]+\s*/gim, " ").trim(),
    url,
    active: handle === "" ? true : null,
    itIsloop: Boolean(itIsloop),
    image: image && image.imgSrc ? normalizeImage(image) : null,
    viewed: viewed || null,
    modifiedDate: modifiedDate || null,
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
  handle,
}: {
  handle: string | null;
}): string => {
  return `/${handle || ""}`;
};
export const normalizeArticle = (data: Schema.Article): Blog.Article => {
  let {
    id,
    title,
    handle,
    absURL,
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
    ogDates: { published_time, modified_time },
    description,
    datePublished,
    dateModified,
  } = data;
  if (!id) {
    throw new Error("No id in article row!");
  }

  if (!datePublished) {
    throw new Error("No article datePublished!");
  }
  if (!dateModified) {
    throw new Error("No article dateModified!");
  }

  if (!published_time) {
    throw new Error("No article published_time!");
  }
  if (!modified_time) {
    throw new Error("No article modified_time!");
  }
  if (!process.env["NEXT_PUBLIC_SITE_ORIGIN"]) {
    throw new Error("No NEXT_PUBLIC_SITE_ORIGIN for canonical url!");
  }
  const { url, canonicalUrl } = getArticleUrlAndCanonicalUrl({
    handle,
    absURL,
  });
  return {
    id,
    title,
    url,
    canonicalUrl,
    absURL: absURL ? `/${absURL}` : "",
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
    handle: handle || null,
    ogDates: {
      modified_time,
      published_time,
    },
    description: description || "",
    datePublished,
    dateModified,
    humanDates: {
      datePublished: DateTime.fromISO(datePublished)
        .setLocale("ru")
        .toLocaleString(DateTime.DATE_FULL),
      dateModified: DateTime.fromISO(dateModified)
        .setLocale("ru")
        .toLocaleString(DateTime.DATE_FULL),
    },
    readingTime: readingTime(text),
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
export const makeImageType = ({
  url,
  imgSrc,
  alt,
  title,
  canonicalUrl,
  height,
  width,
  orderNumber,
  originalWidth,
  originalHeight,
  createdAt,
  updatedAt,
  imageId,
}: {
  url: string;
  imgSrc?: string;
  alt?: string;
  title?: string;
  canonicalUrl?: string;
  height?: number;
  width?: number;
  orderNumber?: number | null;
  originalWidth?: number | null;
  originalHeight?: number | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  imageId?: ID;
}): CMS.Image => {
  return {
    url,
    imgSrc: imgSrc || url,
    alt: alt || "",
    title: title || "",
    canonicalUrl: canonicalUrl || getCanonicalUrl(url),
    height: height || 800,
    width: width || 800,
    orderNumber: orderNumber || null,
    originalWidth: originalWidth || null,
    originalHeight: originalHeight || null,
    createdAt: createdAt || null,
    updatedAt: updatedAt || null,
    imageId: imageId || url,
  };
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
    title,
  } = data;
  const url = imgSrc.startsWith("/") ? imgSrc : `/${imgSrc}`;
  const canonicalUrl = getCanonicalUrl(url);
  return {
    imageId: imageId || "",
    url,
    imgSrc,
    canonicalUrl,
    alt: altText || "",
    height,
    width,
    orderNumber: orderNumber || null,
    originalWidth: originalWidth || null,
    originalHeight: originalHeight || null,
    createdAt: createdAt || null,
    updatedAt: updatedAt || null,
    title: title || "",
  };
};
export const getImagesInputArray = (
  images: (Image | null)[]
): Schema.ImageInput[] => {
  return images
    .filter((el) => el && el.imgSrc)
    .map(({ imageId, imgSrc, title, width, height, alt }: any) => ({
      imageId,
      imgSrc,
      title: title || "",
      altText: alt || "",
      width,
      height,
    }));
};
