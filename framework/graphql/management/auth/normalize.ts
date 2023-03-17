import { Management } from "@common/types/cms";
import { Schema } from "@framework/types";

export const normalizeManagerTokenInfo = (
  data: Schema.Response.VerifyManagementTokenResponse
): Management.ManagerTokenResponse => {
  const { success, error, manager } = data.verifyManagementToken;
  return {
    success,
    error,
    manager,
  };
};
