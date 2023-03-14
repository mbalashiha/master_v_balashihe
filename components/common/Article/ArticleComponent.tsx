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
        spacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{
          mb: { xs: 3, sm: 1 },
          "& a": {
            width: "100%",
            textOverflow: "ellipsis",
            transition: "all .15s ease .05s",
            "&, & h6": {
              textDecoration: "underline",
            },
            "&:hover": {
              "&, & h6": {
                textDecoration: "underline",
              },
            },
            "& > span": {
              height: { xs: "220px", md: "124px" },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              px: 0,
              "& > *": {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
              "& > h6": {
                fontSize: "14px",
                width: "80%",
                maxWidth: "80%",
                maxHeight: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                position: "absolute",
              },
              "& .MuiSvgIcon-root": {
                width: "96px",
                height: "96px",
                position: "absolute",
              },
            },
          },
        }}
      >
        <Grid component={"strong"} item xs={6}>
          {navigation.prev?.url && (
            <Link href={navigation.prev.url}>
              <Button
                component="span"
                sx={{
                  "& h6": {
                    right: { xs: "-2px", sm: "4px", md: "30px" },
                  },
                }}
              >
                <ArrowBackIosRoundedIcon
                  sx={{ left: { xs: "-25px", md: "-9px" } }}
                />
                <h6>{navigation.prev.title}</h6>
              </Button>
            </Link>
          )}
        </Grid>
        <Grid component={"strong"} item xs={6}>
          {navigation.next?.url && (
            <Link href={navigation.next.url}>
              <Button
                component="span"
                sx={{
                  "& h6": {
                    left: { xs: "2px", sm: "4px", md: "30px" },
                  },
                }}
              >
                <h6>{navigation.next.title}</h6>
                <ArrowForwardIosRoundedIcon
                  sx={{ right: { xs: "-25px", md: "-9px" } }}
                />
              </Button>
            </Link>
          )}
        </Grid>
      </Grid>
    </HugeContainer>
  );
}
