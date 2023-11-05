import { gql } from "graphql-request";
import articleCardFragment from "@framework/article/fragments/article-card-fragment";

export const getRecentArticlesQuery = gql`
  ${articleCardFragment}
  query ($search: String) {
    recentArticles(search: $search, limit: 12) {
      nodes {
        ...ArticleCardFragment
      }
    }
  }
`;
