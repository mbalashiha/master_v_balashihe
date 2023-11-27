import { gql } from "graphql-request";
import articleNavItemFragment from "@framework/article/fragments/article-nav-item-fragment";

export const getRecentArticlesQuery = gql`
  ${articleNavItemFragment}
  query ($search: String) {
    recentArticles(search: $search, limit: 12) {
      nodes {
        ...ArticleNavItemFragment
      }
    }
  }
`;
