const extractFieldMessage = (err: string) => {
  const indexOfCurly = err.lastIndexOf("};");
  if (indexOfCurly >= 0) {
    const part = err.substring(indexOfCurly + 2);
    if (part) {
      err = part.trim() + " " + err;
    }
  }
  return err;
};
export default function extractGraphQLError(
  graphqErrorCandidate: any
): string | null {
  let err = graphqErrorCandidate;
  let graphqlError: any =
    (err &&
      err.response &&
      err.response.errors &&
      err.response.errors[0] &&
      err.response.errors[0].message) ||
    null;
  if (!graphqlError) {
    return graphqErrorCandidate;
  } else {
    switch (typeof graphqlError) {
      case "string":
        break;
      case "object":
        graphqlError = JSON.stringify(graphqlError, null, 2);
        break;
      default:
        graphqlError = graphqlError.toString();
    }
    return extractFieldMessage(graphqlError as string);
  }
}
