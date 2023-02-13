import { gql } from "graphql-request";

const articleFragment = gql`
  fragment ArticleFragment on BlogArticle {
    articleId
    title
    handle
    text
    textHtml
    textRawDraftContentState
    autoHandleSlug
    published
    orderNumber
    blogCategoryId
    createdAt
    updatedAt
    publishedAt
  }
`;
export default articleFragment;
