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
