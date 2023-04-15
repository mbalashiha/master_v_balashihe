import Image from "next/image";
import React from "react";
import {
  calculateAspectRatioFit,
  fitWidth as finWidthFunc,
  fitHeight as fitHeightFunc,
} from "@lib/aspect-ration-fit";

type ImageProps = React.ComponentProps<typeof Image>;
type Props = ImageProps & {
  fitWidth?: number;
  fitHeight?: number;
};
export default function EnhImage({
  fitWidth,
  fitHeight,
  width,
  height,
  alt,
  src,
  ...rest
}: Props) {
  const targetDims = React.useMemo(() => {
    if (!width || !height) {
      return { width, height };
    } else if (fitWidth && fitHeight) {
      return calculateAspectRatioFit(
        width as any,
        height as any,
        fitWidth,
        fitHeight
      );
    } else if (fitWidth) {
      return finWidthFunc(width as any, height as any, fitWidth);
    } else if (fitHeight) {
      return fitHeightFunc(width as any, height as any, fitHeight);
    } else {
      return { width, height };
    }
  }, [fitWidth, fitHeight, width, height]);
  return (
    <Image
      width={targetDims.width || undefined}
      height={targetDims.height || undefined}
      alt={alt || ""}
      src={src}
      {...rest}
    />
  );
}
