import { CMS } from "@common/types";
import useImagePaperDimentions from "@components/hooks/useImagePaperDimentions";
import {
  GradientBackground1,
  GradientBackground2,
  GradientBackground3,
} from "@components/shared/Gradients/Backgrounds";
import { fitWidth } from "@lib/aspect-ration-fit";
import { Box, Typography, Paper, Grid } from "@mui/material";
import Image from "next/image";
import React, { useMemo } from "react";
type NextImageType = typeof Image;
type NextImageTypeProps = React.ComponentProps<NextImageType>;
interface Props {
  gradientBackground?: React.ReactNode;
  image: CMS.Image | null;
}
export const ImagePlaceholder = (props: Partial<NextImageTypeProps>) => (
  <Image
    alt="Мастер в Балашихе - Услуга по ремонту"
    width={500}
    height={400}
    src={"/images/icons/image-placeholder.svg"}
    {...props}
  ></Image>
);

export default function ImagePaper({ gradientBackground, image }: Props) {
  const [usingGradientBackground, setGradientBackground] =
    React.useState<React.ReactNode>(gradientBackground);
  React.useEffect(() => {
    let locGradientBackground: React.ReactNode = gradientBackground;
    if (!gradientBackground) {
      const randomIndex = Math.floor(Math.random() * 3);
      switch (randomIndex) {
        case 0:
          locGradientBackground = <GradientBackground1 />;
          break;
        case 1:
          locGradientBackground = <GradientBackground2 />;
          break;
        case 2:
          locGradientBackground = <GradientBackground3 />;
          break;
      }
      setGradientBackground(locGradientBackground);
    }
  }, [gradientBackground]);
  image = image && image.url && image.width ? image : null;
  let {
    src,
    alt,
    width,
    height,
  }: {
    src: string | null;
    alt: string;
    width: number;
    height: number;
  } = image
    ? {
        src: image.url,
        alt: image.alt,
        width: image.width,
        height: image.height,
      }
    : {
        src: null,
        alt: "",
        width: 0,
        height: 0,
      };
  const imageProps = useMemo(() => {
    if (!src || !width) {
      return {
        src: null,
        alt: "",
        width: 0,
        height: 0,
      };
    } else {
      const fitted = fitWidth(width, height, 540);
      return {
        src,
        alt,
        width: fitted.width,
        height: fitted.height,
      };
    }
  }, [src, alt, width, height]);
  src = imageProps.src;
  alt = imageProps.alt;
  width = imageProps.width;
  height = imageProps.height;
  return (
    <Paper
      sx={{
        zIndex: 0,
        position: "relative",
        overflow: "hidden",
        width: "540px",
        maxWidth: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <>
        {(src && (
          <Image src={src} alt={alt} width={width} height={height} />
        )) || <ImagePlaceholder />}
        <Box
          sx={{
            "& svg": {
              zIndex: -1,
              position: "absolute",
              top: "auto",
              right: "auto",
              width: "auto",
              height: "100%",
              bottom: 0,
              left: 0,
            },
          }}
        >
          {usingGradientBackground}
        </Box>
      </>
    </Paper>
  );
}
