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
export function fitWidth(
  srcWidth: number,
  srcHeight: number,
  maxWidth: number
): { width: number; height: number } {
  if (!srcWidth) {
    throw new Error("fit width: no image source width!");
  }
  const ratio = maxWidth / srcWidth;
  return { width: srcWidth * ratio, height: srcHeight * ratio };
}
