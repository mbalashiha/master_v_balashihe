import { gql } from "graphql-request";
import articleCardFragment from "@framework/article/fragments/article-card-fragment";

export const getArticlesCardsQuery = gql`
  ${articleCardFragment}
  query ($search: String) {
    articlesCards(search: $search) {
      nodes {
        ...ArticleCardFragment
      }
    }
  }
`;
