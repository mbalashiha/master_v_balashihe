import { GradientBackground1 } from "@components/shared/Gradients/Backgrounds";
import { Box, Typography, Paper, Grid, Button } from "@mui/material";
import Link from "next/link";
import ImagePaper from "@components/common/Article/ImagePaper";
import Image from "next/image";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { NavSidebar } from "./Sidebars";
import { HugeContainer } from "@components/ui";
import { Blog } from "@common/types/cms";
import util from "util";
type NextImageType = typeof Image;
type NextImageTypeProps = React.ComponentProps<NextImageType>;

interface Props {
  children: React.ReactNode | React.ReactNode[];
  title: string;
  image?: React.ReactNode;
  navigation: Blog.BlogArticleNavigation;
}

export default function Article({ title, children, image, navigation }: Props) {
  return (
    <HugeContainer rightSidebar={<NavSidebar navigation={navigation} />}>
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
          "& img, & .MuiPaper-elevation1": {
            fontSize: "17px",
            lineHeight: "25px",
            marginBottom: "2rem",
            boxShadow: "4px 4px 20px rgba(0, 0, 0, 0.2)",
            borderRadius: 1,
          },
          "& img": {
            my: 1,
            mx: { xs: 0.5, md: 1 },
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
      <Grid
        component="nav"
        container
        spacing={3}
        sx={{
          "& a, & a > *": {
            width: "100%",
            height: "124px",
            textOverflow: "ellipsis",
            transition: "all .15s ease .05s",
            textDecoration: "underline",
            "&:hover": {
              textDecoration: "none",
            },
          },
        }}
      >
        <Grid component={"strong"} item xs={6}>
          {navigation.prev?.url && (
            <Link href={navigation.prev.url}>
              <Button
                component="span"
                startIcon={
                  <ArrowBackIosRoundedIcon
                    sx={{ transform: "scale(4)", ml: 1, mr: 2 }}
                  />
                }
              >
                {navigation.prev.title}
              </Button>
            </Link>
          )}
        </Grid>
        <Grid component={"strong"} item xs={6}>
          {navigation.next?.url && (
            <Link href={navigation.next.url}>
              <Button
                component="span"
                endIcon={
                  <ArrowForwardIosRoundedIcon
                    sx={{ transform: "scale(4)", ml: 2, mr: 1 }}
                  />
                }
              >
                {navigation.next.title}
              </Button>
            </Link>
          )}
        </Grid>
      </Grid>
    </HugeContainer>
  );
}
