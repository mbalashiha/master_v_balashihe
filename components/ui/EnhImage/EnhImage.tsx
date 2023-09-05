import Image from "next/image";
import React, { useMemo } from "react";
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
    allAuto?: boolean;
  };
};
const StyledImage = ({ targetDims: _, alt, ...props }: ImageInProps) => (
  <Image alt={alt} {...props} />
);
type Props = ImageProps & {
  fitWidth?: number;
  fitHeight?: number;
  width: number;
  height: number;
  allAuto?: boolean;
  fitParent?: boolean;
};
export default function EnhImage({
  fitWidth,
  fitHeight,
  width,
  height,
  alt,
  src,
  allAuto,
  fitParent,
  ...rest
}: Props) {
  const targetDims = React.useMemo(() => {
    if (!width || !height) {
      return {
        width,
        height,
        srcWidth: width,
        srcHeight: height,
        allAuto,
      };
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
      return {
        width,
        height,
        srcWidth: width,
        srcHeight: height,
        allAuto,
      };
    }
  }, [fitWidth, fitHeight, width, height, allAuto]);
  const onLoad = useMemo(() => {
    if (fitParent) {
      return (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const target: HTMLImageElement = (event.target ||
          event.currentTarget) as HTMLImageElement;
        target.setAttribute("width", "auto");
        target.setAttribute("height", "auto");
        target.style.width = "100%";
        target.style.height = "auto";
      };
    }
  }, [fitParent]);
  return (
    <StyledImage
      targetDims={targetDims}
      width={targetDims.width}
      height={targetDims.height}
      alt={alt || ""}
      src={src}
      onLoad={onLoad}
      {...rest}
    />
  );
}
