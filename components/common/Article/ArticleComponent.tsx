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
import DescriptionParser from "./DescriptionParser";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { NavSidebar } from "./Sidebars";
import { HugeContainer, Tooltip } from "@components/ui";
import SpecialHeader from "./SpecialHeader";
import { CMS } from "@common/types";
import { StyledFab } from "./StyledFab";
import { HeaderTextParser } from "@components/common/HeaderTextParser";
import CallButton from "./CallButton";
import NavigationButtons from "./NavigationButtons/NavigationButtons";

interface Props extends CMS.Blog.Article {}

export default function Article({
  title,
  image,
  navigation,
  keyTextHtml,
  renderHtml,
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
          "&, & p, & .Paper-root": {
            fontFamily: 'Roboto, "Segoe UI", Tahoma, Verdana, Arial',
            fontWeight: 500,
            fontSize: "18px",
            lineHeight: "28px",
            color: (theme) =>
              theme.palette.mode === "light" ? "#0e0e0f" : "white",
          },
          "& img, & .Paper-elevation1": {
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
          <DescriptionParser descriptionHTML={renderHtml} />
        </Paper>
      </Box>
      <NavigationButtons navigation={navigation} />
    </HugeContainer>
  );
}
