import Image from "next/image";
import React from "react";
import { styled } from "@mui/material";
import {
  calculateAspectRatioFit,
  fitWidth as finWidthFunc,
  fitHeight as fitHeightFunc,
} from "@lib/aspect-ration-fit";
type ImageProps = React.ComponentProps<typeof Image>;
type ImageInProps = React.ComponentProps<typeof Image> & {
  targetDims: {
    width: number;
    height: number;
    srcWidth: number;
    srcHeight: number;
    allAuto: boolean;
  };
};
const StyledImage = styled(({ targetDims: _, alt, ...props }: ImageInProps) => (
  <Image alt={alt} {...props} />
))<{
  targetDims: {
    width: number;
    height: number;
    srcWidth: number;
    srcHeight: number;
    allAuto: boolean;
  };
}>(
  ({ theme, targetDims: { width, height, srcWidth, srcHeight, allAuto } }) => ({
    width: allAuto || !width ? "auto" : width + "px",
    height: "auto",
    aspectRatio: srcWidth && srcHeight ? `${srcWidth} / ${srcHeight}` : "auto",
  })
);
type Props = ImageProps & {
  fitWidth?: number;
  fitHeight?: number;
  width: number;
  height: number;
  allAuto?: boolean;
};
export default function EnhImage({
  fitWidth,
  fitHeight,
  width,
  height,
  alt,
  src,
  allAuto,
  ...rest
}: Props) {
  const targetDims = React.useMemo(() => {
    if (!width || !height) {
      return { width, height, srcWidth: width, srcHeight: height, allAuto };
    } else if (fitWidth && fitHeight) {
      return {
        ...calculateAspectRatioFit(
          width as any,
          height as any,
          fitWidth,
          fitHeight
        ),
        allAuto,
      };
    } else if (fitWidth) {
      return {
        ...finWidthFunc(width as any, height as any, fitWidth),
        allAuto,
      };
    } else if (fitHeight) {
      return {
        ...fitHeightFunc(width as any, height as any, fitHeight),
        allAuto,
      };
    } else {
      return { width, height, srcWidth: width, srcHeight: height, allAuto };
    }
  }, [fitWidth, fitHeight, width, height, allAuto]);
  return (
    <StyledImage
      targetDims={targetDims}
      width={targetDims.width}
      height={targetDims.height}
      alt={alt || ""}
      src={src}
      {...rest}
    />
  );
}
