import { gql } from "graphql-request";
import articleCardFragment from "@framework/article/fragments/article-card-fragment";

export const getAllArticlesQuery = gql`
  ${articleCardFragment}
  query getAllArticlesQuery {
    blogArticles {
      nodes(limit: 250) {
        ...ArticleCardFragment
      }
    }
  }
`;
