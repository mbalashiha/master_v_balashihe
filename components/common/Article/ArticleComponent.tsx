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
import { CallMeForFree } from "@components/site/LandingPage";

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
    <>
      <SpecialHeader image={image} keyTextHtml={keyTextHtml}>
        {title}
      </SpecialHeader>
      <HugeContainer
        sx={{ mb: "10px" }}
        rightSidebar={navigation && <NavSidebar navigation={navigation} />}
      >
        <Stack
          direction={"row"}
          alignContent="center"
          justifyContent="space-between"
          justifyItems={"center"}
          alignItems="center"
          mb={2}
          sx={{
            "& a[href]": {
              "&, & > span": {
                display: "block",
                borderRadius: "100%",
              },
            },
          }}
        >
          {navigation?.prev?.url ? (
            <Link href={navigation.prev.url}>
              <Tooltip title={<>{navigation.prev.title}</>} placement="right">
                <StyledFab size="medium" aria-label="Предыдущая страница">
                  <ArrowBackIosRoundedIcon />
                </StyledFab>
              </Tooltip>
            </Link>
          ) : (
            <div></div>
          )}

          <CallButton />
          {navigation?.next?.url ? (
            <Link href={navigation.next.url}>
              <Tooltip title={<>{navigation.next.title}</>} placement="left">
                <StyledFab size="medium" aria-label="Следующая страница">
                  <ArrowForwardIosRoundedIcon />
                </StyledFab>
              </Tooltip>
            </Link>
          ) : (
            <div></div>
          )}
        </Stack>
        <Paper
          component="article"
          sx={{
            "&, & p, & .Paper-root": {
              fontFamily: 'Roboto, "Segoe UI", Tahoma, Verdana, Arial',
              fontWeight: 500,
              fontSize: "18px",
              lineHeight: "27px",
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
            "& h3": {
              marginBottom: "0.7rem",
            },
            p: { xs: 3, md: 4, xl: 5 },
            boxShadow: "none",
            boxSizing: "border-box",
            overflow: "hidden",
            border: "2px solid rgb(235, 235, 234)",
            borderRadius: 1,
          }}
        >
          <DescriptionParser descriptionHTML={renderHtml} />
          <CallMeForFree
            sx={{
              color: "rgba(0, 0, 0, 0.87)",
              fontSize: "24px",
              lineHeight: "30px",
            }}
          />
        </Paper>
        <NavigationButtons navigation={navigation} />
      </HugeContainer>
    </>
  );
}
