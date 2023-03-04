import { GradientBackground1 } from "@components/shared/Gradients/Backgrounds";
import { Box, Typography, Paper, Grid } from "@mui/material";
import ImagePaper from "@components/common/Article/ImagePaper";
import Image from "next/image";
import { Sidebar1 } from "./Sidebars";
import { HugeContainer } from "@components/ui";
type NextImageType = typeof Image;
type NextImageTypeProps = React.ComponentProps<NextImageType>;

interface Props {
  children: React.ReactNode | React.ReactNode[];
  title: string;
  image?: React.ReactNode;
}

export default function Article({ title, children, image }: Props) {
  return (
    <HugeContainer rightSidebar={<Sidebar1 />}>
      <Grid container spacing={0}>
        {image && (
          <>
            <Grid item xs={12} md={6} lg={6}>
              <ImagePaper image={image} />
            </Grid>
            <Grid item xs={12} md={6} lg={6}></Grid>
          </>
        )}
      </Grid>
      <Box component="header">
        <Typography
          component="h1"
          variant="h1"
          sx={{
            color: "primary.main",
            fontSize: "25px",
            lineHeight: "30px",
            fontWeight: 600,
            pb: "35px",
          }}
        >
          {title}
        </Typography>
      </Box>
      <Box
        component="article"
        sx={{
          "&, & p, & .MuiPaper-root": {
            fontFamily: 'Roboto, "Segoe UI", Tahoma, Verdana, Arial',
            fontWeight: 500,
            fontSize: "18px",
            lineHeight: "28px",
            color: (theme) =>
              theme.palette.mode === "light" ? "#0e0e0f" : "white",
          },
          "& .MuiPaper-elevation1": {
            fontSize: "17px",
            lineHeight: "25px",
            marginBottom: "2rem",
            boxShadow: "4px 4px 20px rgba(0, 0, 0, 0.2)",
          },
          "& > h2:first-of-type": {
            marginTop: 0,
          },
          "&& h2": {
            color: (theme) =>
              theme.palette.mode === "light" ? "black" : "white",
            fontSize: "21px",
            lineHeight: "26px",
            fontWeight: 500,
            marginBottom: "1.5rem",
          },
        }}
      >
        {children}
      </Box>
    </HugeContainer>
  );
}
