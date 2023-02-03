export default function extractGraphQLError(
  graphqErrorCandidate: any
): string | null {
  let err = graphqErrorCandidate;
  const graphqlError: any =
    (err &&
      err.response &&
      err.response.errors &&
      err.response.errors[0] &&
      err.response.errors[0].message) ||
    null;
  if (!graphqlError) {
    return graphqErrorCandidate;
  } else if (typeof graphqlError !== "string") {
    if (typeof graphqlError === "object") {
      return JSON.stringify(graphqlError, null, 2);
    } else {
      return graphqlError.toString();
    }
  } else {
    return graphqlError;
  }
}
