import { gql } from "graphql-request";

const articleNavItemFragment = gql`
  fragment ArticleNavItemFragment on ArticleCard {
    id
    title
    handle
    publishedAt
    updatedAt
    modifiedDate
    publishedDate
    viewed
  }
`;
export default articleNavItemFragment;
