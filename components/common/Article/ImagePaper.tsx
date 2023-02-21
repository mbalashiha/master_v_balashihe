import useImagePaperDimentions from "@components/hooks/useImagePaperDimentions";
import {
  GradientBackground1,
  GradientBackground2,
  GradientBackground3,
} from "@components/shared/Gradients/Backgrounds";
import { fitWidth } from "@lib/aspect-ration-fit";
import { Box, Typography, Paper, Grid } from "@mui/material";
import Image from "next/image";
import React from "react";
type NextImageType = typeof Image;
type NextImageTypeProps = React.ComponentProps<NextImageType>;
interface Props {
  gradientBackground?: React.ReactNode;
  image?: React.ReactNode;
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

export default function ImagePaper({
  gradientBackground,
  image = <ImagePlaceholder />,
}: Props) {
  image = React.useMemo(() => {
    let cloningImage = image;
    if (React.isValidElement(cloningImage)) {
      cloningImage = React.cloneElement(cloningImage, {
        layout: "responsive",
      } as any);
    }
    return cloningImage;
  }, [image]);
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
  const { imagePaperRef } = useImagePaperDimentions(image);
  return (
    <Paper
      ref={imagePaperRef}
      sx={{
        zIndex: 0,
        position: "relative",
        overflow: "hidden",
        height: "400px",
        "&, & img": {
          width: { xs: "100%", sm: "500px" },
        },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <>
        {image}
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
