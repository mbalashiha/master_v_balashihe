import { gql } from "graphql-request";
import articleFragment from "@framework/article/fragments/article-fragment";

export const getArticleByAbsUrlQuery = gql`
  ${articleFragment}
  query ($absURL: String) {
    articleByAbsUrl(absURL: $absURL) {
      ...ArticleFragment
    }
  }
`;
