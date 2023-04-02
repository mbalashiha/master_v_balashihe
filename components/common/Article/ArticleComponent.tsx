import { GradientBackground1 } from "@components/shared/Gradients/Backgrounds";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Stack,
  Fab,
} from "@mui/material";
import Link from "next/link";
import ImagePaper from "@components/common/Article/ImagePaper";
import Image from "next/image";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { NavSidebar } from "./Sidebars";
import { HugeContainer, Tooltip } from "@components/ui";
import { Blog } from "@common/types/cms";
import util from "util";
import SpecialHeader from "./SpecialHeader";
import { CMS } from "@common/types";
import { StyledFab } from "./StyledFab";
type NextImageType = typeof Image;
type NextImageTypeProps = React.ComponentProps<NextImageType>;

interface Props {
  children: React.ReactNode | React.ReactNode[];
  title: string;
  image: CMS.Image | null;
  navigation?: Blog.BlogArticleNavigation;
}

export default function Article({ title, children, image, navigation }: Props) {
  return (
    <HugeContainer
      showSearch
      rightSidebar={navigation && <NavSidebar navigation={navigation} />}
    >
      <SpecialHeader>{title}</SpecialHeader>
      <Grid container spacing={0} mb={2}>
        <Grid item xs={12} md={6} lg={6}>
          <ImagePaper image={image} />
        </Grid>
        <Grid item xs={12} md={6} lg={6}></Grid>
      </Grid>
      <Stack
        direction={"row"}
        alignContent="center"
        justifyContent="space-between"
        mb={2}
      >
        {navigation?.prev?.url ? (
          <Tooltip title={navigation.prev.title}>
            <Link href={navigation.prev.url}>
              <StyledFab size="medium" aria-label="Предыдущая страница">
                <ArrowBackIosRoundedIcon />
              </StyledFab>
            </Link>
          </Tooltip>
        ) : (
          <div></div>
        )}

        {navigation?.next?.url ? (
          <Tooltip title={navigation.next.title}>
            <Link href={navigation.next.url}>
              <StyledFab size="medium" aria-label="Следующая страница">
                <ArrowForwardIosRoundedIcon />
              </StyledFab>
            </Link>
          </Tooltip>
        ) : (
          <div></div>
        )}
      </Stack>
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
            "&, & .MuiSvgIcon-root, & .MuiButtonBase-root, & *, & > *": {
              transition: "all ease-in-out .1s",
            },
            "&, &:hover": {
              textDecoration: "none",
            },
            "&:hover": {
              "& .MuiSvgIcon-root, & .MuiButtonBase-root, & *, & > *": {
                color: "#ff7777",
              },
            },
            "& > span": {
              height: { xs: "220px", md: "124px" },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              background: (theme) => theme.palette.background.paper,
              borderColor: (theme) => theme.palette.background.paper,
              borderRadius: "2rem",
              border: "none",
              boxShadow:
                "#0000001a 0rem 0.25rem 0.375rem -0.0625rem, #0000000f 0rem 0.125rem 0.25rem -0.0625rem",
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
                width: "85px",
                height: "85px",
                position: "absolute",
              },
            },
          },
        }}
      >
        <Grid component={"strong"} item xs={6}>
          {navigation?.prev?.url && (
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
                  sx={{ left: { xs: "-23px", md: "-21px", xl: "-10px" } }}
                />
                <h6>{navigation.prev.title}</h6>
              </Button>
            </Link>
          )}
        </Grid>
        <Grid component={"strong"} item xs={6}>
          {navigation?.next?.url && (
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
                  sx={{ right: { xs: "-23px", md: "-21px", xl: "-10px" } }}
                />
              </Button>
            </Link>
          )}
        </Grid>
      </Grid>
    </HugeContainer>
  );
}
