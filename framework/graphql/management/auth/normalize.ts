export const normalizeManagerTokenInfo = (
  data: Schema.QueryResponse.VerifyManagementTokenResponse
): Management.ManagerTokenResponse => {
  const { success, error, manager } = data.verifyManagementToken;
  return {
    success,
    error,
    manager,
  };
};
