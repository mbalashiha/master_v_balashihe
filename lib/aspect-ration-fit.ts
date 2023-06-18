/**
 * @param num The number to round
 * @param precision The number of decimal places to preserve
 */
export function millisRound(num: number, precision: number = 3) {
  precision = Math.pow(10, precision);
  return Math.round(num * precision) / precision;
}
export function calculateAspectRatioFit(
  srcWidth: number,
  srcHeight: number,
  maxWidth: number,
  maxHeight: number
): { width: number; height: number; srcWidth: number; srcHeight: number; } {
  srcWidth = srcWidth || maxWidth;
  srcHeight = srcHeight || maxHeight;
  const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
  return {
    width: millisRound(srcWidth * ratio),
    height: millisRound(srcHeight * ratio),
    srcWidth,
    srcHeight,
  };
}
export function fitWidth(
  srcWidth: number,
  srcHeight: number,
  maxWidth: number
): { width: number; height: number, srcWidth: number, srcHeight: number, } {
  if (!srcWidth) {
    throw new Error("fit width: no image source width!");
  }
  const ratio = maxWidth / srcWidth;
  return {
    width: millisRound(srcWidth * ratio),
    height: millisRound(srcHeight * ratio),
    srcWidth, srcHeight,
  };
}
export function fitHeight(
  srcWidth: number,
  srcHeight: number,
  maxHeight: number
): { width: number; height: number; srcWidth: number; srcHeight: number; } {
  if (!srcHeight) {
    throw new Error("fit height: no image source height!");
  }
  const ratio = maxHeight / srcHeight;
  return {
    width: millisRound(srcWidth * ratio),
    height: millisRound(srcHeight * ratio),
    srcWidth,
    srcHeight,
  };
}
