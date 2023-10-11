import { CMS } from "@common/types";
import Image from "next/image";
import { EnhImage } from "@components/ui";
import { Box, Typography, Paper, Grid } from "@mui/material";
import React, { useMemo } from "react";
type NextImageType = typeof Image;
type NextImageTypeProps = React.ComponentProps<NextImageType>;
interface Props {
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

export default function ImagePaper({ image }: Props) {
  /*const [usingGradientBackground, setGradientBackground] =
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
  }, [gradientBackground]);*/
  const {
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
  return (
    <Paper
      sx={{
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <>
        {(src && (
          <EnhImage
            src={src}
            alt={alt}
            width={width}
            height={height}
            fitWidth={540}
            fitHeight={540}
          />
        )) || <ImagePlaceholder />}
      </>
    </Paper>
  );
}
