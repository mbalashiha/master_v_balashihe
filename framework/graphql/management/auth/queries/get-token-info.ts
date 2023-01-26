import { gql } from "graphql-request";

export const verifyManagementToken = gql`
  fragment ManagerFragment on Manager {
    id
    friendlyName
    isManager
    isAdmin
    created
    updated
  }
  query verifyManagementToken {
    verifyManagementToken {
        success
        error
        manager {
            ...ManagerFragment
        }
    }
  }
`;
