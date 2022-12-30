import { GradientBackground1 } from "@components/shared/Gradients/Backgrounds";
import { Box, Typography, Paper, Grid } from "@mui/material";
import Image from "next/image";
interface Props {
  gradientBackground?: React.ReactNode;
}
export default function ImagePaper({
  gradientBackground = <GradientBackground1 />,
}: Props) {
  return (
    <Paper
      sx={{
        zIndex: 0,
        position: "relative",
        overflow: "hidden",
        height: "400px",
        width: { xs: "100%", md: "500px" },
        "& svg": {
          zIndex: 2,
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
          zIndex: 0,
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
        {gradientBackground}
      </Box>
    </Paper>
  );
}
