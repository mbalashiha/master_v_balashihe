import { fitWidth } from "@lib/aspect-ration-fit";
import { Box, Typography, Paper, Grid } from "@mui/material";
import React from "react";

export default function useImagePaperDimentions(image?: React.ReactNode) {
  const imagePaperRef = React.useRef<HTMLDivElement>(null);
  const originalImgWidth = image && (image as any).width;
  const originalImgHeight = image && (image as any).height;
  const setPaperDimentions = React.useCallback(() => {
    if (imagePaperRef.current) {
      const div = imagePaperRef.current;
      const imageElem = div.querySelector("img");
      if (
        imageElem &&
        imageElem.src &&
        !/(\.svg\&)|(.svg$)/im.test(imageElem.src)
      ) {
        const imageDims = {
          width: originalImgWidth || imageElem.width || imageElem.offsetWidth,
          height:
            originalImgHeight || imageElem.height || imageElem.offsetHeight,
        };
        const containerDims = {
          width: div.offsetWidth,
          height: div.offsetHeight,
        };
        const newImageDims = fitWidth(
          imageDims.width,
          imageDims.height,
          containerDims.width
        );
        imageElem.style.height = newImageDims.height + "px";
        imageElem.style.width = newImageDims.width + "px";
        if (newImageDims.height > 400) {
          div.style.height = newImageDims.height + "px";
        }
      }
    }
  }, [originalImgWidth, originalImgHeight]);
  React.useEffect(() => setPaperDimentions(), [setPaperDimentions]);
  React.useEffect(() => {
    window.addEventListener("resize", setPaperDimentions);
    return () => window.removeEventListener("resize", setPaperDimentions);
  }, [setPaperDimentions]);
  return { imagePaperRef };
}
