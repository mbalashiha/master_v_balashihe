import {
  GradientBackground1,
  GradientBackground2,
  GradientBackground3,
} from "@components/shared/Gradients/Backgrounds";
import { Box, Typography, Paper, Grid } from "@mui/material";
import Image from "next/image";
import React from "react";
interface Props {
  gradientBackground?: React.ReactNode;
}
export default function ImagePaper({ gradientBackground }: Props) {
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
  return (
    <Paper
      sx={{
        zIndex: 0,
        position: "relative",
        overflow: "hidden",
        height: "400px",
        width: { xs: "100%", md: "500px" },
        maxWidth: "100%",
        "& img": {
          width: "100%",
        },
      }}
    >
      <Image
        alt="Мастер в Балашихе - Услуга по ремонту"
        width={500}
        height={400}
        src={"/images/icons/image-placeholder.svg"}
      ></Image>
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
    </Paper>
  );
}
