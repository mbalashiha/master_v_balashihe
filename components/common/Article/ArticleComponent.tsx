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
import useCountViews from "@framework/site/use-count-views";
import { useEffect, useRef } from "react";
import { grey } from "@mui/material/colors";
import Image from "next/image";

interface Props extends CMS.Blog.Article {}

export default function Article({
  title,
  image,
  navigation,
  keyTextHtml,
  renderHtml,
  id,
  h2,
  secondImage,
  randomImage,
}: Props) {
  const countViews = useCountViews();
  const countViewsRef = useRef(countViews);
  useEffect(() => {
    countViewsRef.current = countViews;
  }, [countViews]);
  useEffect(() => {
    if (id) {
      const countViews = countViewsRef.current;
      countViews({ articleId: id });
    }
  }, [id]);
  const imgSrc = secondImage?.url || randomImage?.url;
  return (
    <>
      <SpecialHeader image={image} keyTextHtml={keyTextHtml}>
        {title}
      </SpecialHeader>
      <HugeContainer
        sx={{
          paddingTop: { xs: "200px", sm: "140px", md: "120px" },
          mb: "10px",
          background: "linear-gradient(180deg, #DFE7EB 1%, transparent 99%)",
        }}
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
              maxWidth: "100%",
              height: "auto",
            },
            "& > img.firstImage": {
              width: {
                xs: "100%",
                md: "480px",
              },
              float: "left",
              margin: { xs: "0 2em 2em 0", md: "0 2em 1em 0" },
              height: "auto",
            },
            "& > h2:not(:first-of-type)": {
              color: (theme) =>
                theme.palette.mode === "light" ? grey[600] : grey[400],
              fontSize: "21px",
              lineHeight: "26px",
              fontWeight: 500,
              marginBottom: "1.5rem",
            },
            marginBottom: "1.5rem",
            "& > h3": {
              color: (theme) =>
                theme.palette.mode === "light" ? grey[800] : grey[200],
              marginBottom: "0.7rem",
            },
            "& > h4": {
              color: (theme) =>
                theme.palette.mode === "light" ? grey[900] : grey[100],
              marginBottom: "0.7rem",
            },
            p: {
              xs: "24px 30px 30px 30px",
              md: "24px 40px 40px 40px",
              xl: "27px 50px 50px 50px",
            },
            boxShadow: "none",
            boxSizing: "border-box",
            overflow: "hidden",
            border: "2px solid rgb(235, 235, 234)",
            borderRadius: 1,
          }}
        >
          <Typography
            variant="h2"
            component="h2"
            sx={{
              color: grey[600],
              fontSize: "26px",
              fontWeight: 600,
              marginTop: 0,
              marginBottom: "1em",
            }}
          >
            {h2 || title}
          </Typography>
          {imgSrc && (
            <Image
              src={imgSrc}
              width={480}
              height={480}
              alt={`Балашиха Нужен мастер для ремонта ${h2 || title}`}
              className={"firstImage"}
            />
          )}
          <DescriptionParser descriptionHTML={renderHtml} />
          <CallMeForFree
            sx={{
              p: 0,
            }}
          />
        </Paper>
        <NavigationButtons navigation={navigation} />
      </HugeContainer>
    </>
  );
}
