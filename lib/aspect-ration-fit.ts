export function calculateAspectRatioFit(
  srcWidth: number | undefined,
  srcHeight: number | undefined,
  maxWidth: number,
  maxHeight: number
): { width: number; height: number } {
  srcWidth = srcWidth || maxWidth;
  srcHeight = srcHeight || maxHeight;
  const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

  return { width: srcWidth * ratio, height: srcHeight * ratio };
}
/**
 * @param num The number to round
 * @param precision The number of decimal places to preserve
 */
export function roundUp(num: number, precision: number = 1) {
  precision = Math.pow(10, precision);
  return Math.ceil(num * precision) / precision;
}
