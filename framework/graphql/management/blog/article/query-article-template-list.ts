import { gql } from "graphql-request";

export const managementArticleTemplates = gql`
  query managementArticleTemplates {
    managementArticleTemplates {
      templateId
      templateName
    }
  }
`;
