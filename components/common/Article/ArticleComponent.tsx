import { GradientBackground1 } from "@components/shared/Gradients/Backgrounds";
import { Box, Typography, Paper, Grid } from "@mui/material";
import ImagePaper from "@components/common/Article/ImagePaper";
import Image from "next/image";
import { Sidebar1 } from "./Sidebars";

type NextImageType = typeof Image;
type NextImageTypeProps = React.ComponentProps<NextImageType>;

interface Props {
  children: React.ReactNode | React.ReactNode[];
  title: string;
  image?: React.ReactNode;
}

export default function Article({ title, children, image }: Props) {
  return (
    <>
      <Grid
        container
        sx={{ mt: 0, mb: "60px" }}
        spacing={{ xs: 0, lg: 1, xl: 2 }}
      >
        <Grid item xs={12} lg={8} xl={9}>
          <Typography
            component="h1"
            variant="h5"
            sx={{
              mb: { xs: "16px", md: "36px" },
              color: (theme) => theme.palette.primary.dark,
            }}
          >
            {title}
          </Typography>
          <Grid
            container
            sx={{ mt: 0, mb: 0 }}
            spacing={{ xs: 1, sm: 1, md: 2, lg: 3, xl: 4 }}
          >
            <Grid item xs={12} md={6} lg={6}>
              <ImagePaper image={image} />
            </Grid>
            <Grid item xs={12} md={6} lg={6}></Grid>
            <Grid item xs={12} md={12}>
              <Paper
                component="article"
                elevation={0}
                sx={{
                  padding: { xs: "1.5em 1em 1em 1em", md: "2em" },
                  "& p, & .MuiPaper-root": {
                    fontFamily: '"Segoe UI", Tahoma, Verdana, Arial',
                    fontSize: "20px",
                    lineHeight: "32px",
                    color: (theme) =>
                      theme.palette.mode === "dark" ? "white" : "black",
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
                    color: (theme) => theme.palette.primary.light,
                  },
                }}
              >
                {children}
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={4} xl={3}>
          <Sidebar1 />
        </Grid>
      </Grid>
    </>
  );
}
