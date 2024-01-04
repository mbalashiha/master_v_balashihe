import { gql } from "graphql-request";
import { articleDraftFragment } from "@framework/management/blog/article/draft/fragments";

export const saveArticle = gql`
  ${articleDraftFragment}
  mutation (
    $article: ArticleInput!
    $hostOrigin: String!
    $NEXT_PUBLIC_PRODUCTION_SITE_ORIGIN: String!
  ) {
    saveArticle(
      article: $article
      hostOrigin: $hostOrigin
      NEXT_PUBLIC_PRODUCTION_SITE_ORIGIN: $NEXT_PUBLIC_PRODUCTION_SITE_ORIGIN
    ) {
      success
      error
      message
      articleId
      articleDraft {
        ...DraftFragment
      }
      productionUuidsByIndexNow {
        nodes {
          uuid
          apiUrl
        }
      }
    }
  }
`;
