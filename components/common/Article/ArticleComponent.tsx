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
import { blueGrey } from "@mui/material/colors";
import { standartCssTransition } from "@components/ui/theme/mui-theme";
import { HeaderTextParser } from "@components/common/HeaderTextParser";
import CallButton from "./CallButton";

interface Props extends CMS.Blog.Article {
  children: React.ReactNode | React.ReactNode[];
}

export default function Article({
  title,
  children,
  image,
  navigation,
  keyTextHtml,
}: Props) {
  // if (!keyTextHtml) {
  //   throw new Error("Why is not keyTextHtml?");
  // }
  return (
    <HugeContainer
      rightSidebar={navigation && <NavSidebar navigation={navigation} />}
    >
      <SpecialHeader>{title}</SpecialHeader>
      <Grid container spacing={{ xs: 1, md: 2 }} mb={2}>
        <Grid
          item
          xs={12}
          md={6}
          lg={6}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: { xs: "center", md: "flex-start" },
          }}
        >
          <ImagePaper image={image} />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          lg={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {(keyTextHtml && (
            <Box
              sx={{
                flexGrow: 1,
                "& > *": {
                  p: 0,
                  m: 0,
                  ml: "30px",
                  "&::before": {
                    display: "inline-block",
                    content: `"\\2605"`,
                    fontSize: "24px",
                    lineHeight: "20px",
                    transform: "translate(-30px,2px)",
                    width: 0,
                    overflow: "visible",
                    color: "orange",
                  },
                },
              }}
            >
              <HeaderTextParser htmlText={keyTextHtml} />
            </Box>
          )) || <Box sx={{ flexGrow: 1 }}></Box>}
          <CallButton />
        </Grid>
      </Grid>
      <Stack
        direction={"row"}
        alignContent="center"
        justifyContent="space-between"
        mb={2}
      >
        {navigation?.prev?.url ? (
          <Tooltip
            title={
              <>
                <header>Предыдущая страница:</header>
                {navigation.prev.title}
              </>
            }
            placement="right"
          >
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
          <Tooltip
            title={
              <>
                <header>Следующая страница:</header>
                {navigation.next.title}
              </>
            }
            placement="left"
          >
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
          marginBottom: "1.5rem",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4, xl: 5 },
            boxShadow: "none",
            boxSizing: "border-box",
            overflow: "hidden",
            border: "2px solid rgb(235, 235, 234)",
          }}
        >
          {children}
        </Paper>
      </Box>
      <Grid
        component="nav"
        container
        spacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{
          mb: { xs: 3, sm: 1 },
          "& a": {
            padding: 0,
            width: "100%",
            textOverflow: "ellipsis",
            display: "block",
            "&, & > span": {
              borderRadius: "2rem",
              border: "none",
              background: (theme) => theme.palette.background.paper,
              borderColor: (theme) => theme.palette.background.paper,
            },
            "&:hover": {
              "& .MuiSvgIcon-root, & .MuiButtonBase-root, & *, & > *": {
                textDecoration: "none",
                color: "#ff7777",
              },
              "&, & > span": {
                background: (theme) => theme.palette.primary.main,
                borderColor: (theme) => theme.palette.primary.main,
              },
            },
            "& > span": {
              height: { xs: "220px", md: "124px" },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              boxShadow: "none",
              boxSizing: "border-box",
              overflow: "hidden",
              border: "2px solid rgb(235, 235, 234)",
              "& .MuiSvgIcon-root": {
                width: { xs: "30px", md: "75px" },
                height: { xs: "30px", md: "75px" },
                color: "rgb(235, 235, 234)",
              },
              p: 0,
              "& > *": {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
              "& h6": {
                fontSize: "14px",
                overflow: "hidden",
                textOverflow: "ellipsis",
              },
            },
          },
        }}
      >
        <Grid component={"strong"} item xs={6}>
          {navigation?.prev?.url && (
            <Link href={navigation.prev.url}>
              <Button component="span">
                <Stack component="span" direction={"row"}>
                  <ArrowBackIosRoundedIcon />
                  <Box component="h6" sx={{ flexGrow: 1, mr: 1 }}>
                    {navigation.prev.title}
                  </Box>
                </Stack>
              </Button>
            </Link>
          )}
        </Grid>
        <Grid component={"strong"} item xs={6}>
          {navigation?.next?.url && (
            <Link href={navigation.next.url}>
              <Button component="span">
                <Stack component="span" direction={"row"}>
                  <Box component="h6" sx={{ flexGrow: 1, ml: 1 }}>
                    {navigation.next.title}
                  </Box>
                  <ArrowForwardIosRoundedIcon />
                </Stack>
              </Button>
            </Link>
          )}
        </Grid>
      </Grid>
    </HugeContainer>
  );
}
