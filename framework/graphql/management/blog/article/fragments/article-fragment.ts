import { gql } from "graphql-request";

const articleFragment = gql`
  fragment ArticleFragment on BlogArticle {
    id
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
