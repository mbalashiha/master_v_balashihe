import { gql } from "graphql-request";
import articleCardFragment from "@framework/management/blog/article/fragments/management-article-card";

export const managementArticlesCards = gql`
  ${articleCardFragment}
  query ($search: String) {
    managementArticlesCards(search: $search) {
      search
      nodes {
        ...ArticleCardFragment
      }
    }
  }
`;
