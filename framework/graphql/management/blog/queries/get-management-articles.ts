import { gql } from "graphql-request";
import { ListArticleFragment } from "./list-article-fragment";

export const managementGetArticles = gql`
  ${ListArticleFragment}
  query managementGetArticles {
    managementGetArticles {
      ...ListArticleFragment
    }
  }
`;
