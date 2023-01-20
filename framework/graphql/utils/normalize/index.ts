export const normalizeArticle = (data: Schema.BlogArticle): Blog.Article => {
  const {
    articleId,
    title,
    handle,
    description,
    descriptionHtml,
    published,
    orderNumber,
    category,
    image,
    images,
    createdAt,
    updatedAt,
    publishedAt,
    breadcrumbs,
  } = data;
  return {
    articleId,
    title,
    url: `/${handle}`,
    description,
    descriptionHtml,
    published,
    orderNumber,
    category,
    image,
    images,
    createdAt,
    updatedAt,
    publishedAt,
    breadcrumbs,
  };
};

export const normalizeArticles = (
  data: Schema.QueryResponse.BlogArticles
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
    orderNumber,
    originalWidth,
    originalHeight,
    createdAt,
    updatedAt,
  };
};
