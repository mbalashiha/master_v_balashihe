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
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { HugeContainer, Tooltip } from "@components/ui";
import SpecialHeader from "./SpecialHeader";
import { CMS } from "@common/types";
import { StyledFab } from "./StyledFab";
import CallButton from "./CallButton";
import NavigationButtons from "./NavigationButtons/NavigationButtons";
import { CallMeForFree } from "@components/site/LandingPage";
import useCountViews from "@framework/site/use-count-views";
import { useEffect, useRef } from "react";
import { grey } from "@mui/material/colors";
import Image from "next/image";
import Head from "next/head";
import { NavSidebar } from "../BlogArticle/Sidebars";
import DescriptionParser from "../BlogArticle/DescriptionParser";
import { ArticleBreadcrumbs } from "../BlogArticle/ArticleBreadcrumbs";
import { BottomContactsWithMap } from "@components/site/LandingPage/BottomContactsWithMap";

interface Props extends CMS.Blog.Article {}

export default function ContactArticleComponent({
  title,
  image: inImage,
  navigation,
  keyTextHtml,
  renderHtml,
  id,
  h2,
  secondImage,
  randomImage,
  url,
  canonicalUrl,
  ogDates,
  dateModified,
  datePublished,
  ...rest
}: Props) {
  const articleImage =
    secondImage && secondImage?.url ? secondImage : randomImage;
  const imgSrc = articleImage?.url;
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
  return (
    <>
      <Head>
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:image" content={articleImage?.canonicalUrl} />
        <meta
          property="og:image:width"
          content={articleImage?.width.toString() || ""}
        />
        <meta
          property="og:image:height"
          content={articleImage?.height.toString() || ""}
        />
        <meta property="og:article:author" content="Компьютерный мастер" />
        <meta property="og:article:tag" content="Балашиха" />
        <meta
          property="og:article:modified_time"
          content={ogDates.modified_time}
        />
        <meta
          property="og:article:published_time"
          content={ogDates.published_time}
        />
      </Head>
      <Box width="100%" itemScope itemType="https://schema.org/BlogPosting">
        <link itemProp="mainEntityOfPage" href={canonicalUrl} />
        <meta itemProp="datePublished" content={datePublished} />
        <meta itemProp="dateModified" content={dateModified} />
        {articleImage?.canonicalUrl && (
          <meta itemProp="image" content={articleImage?.canonicalUrl} />
        )}
        <SpecialHeader image={inImage} keyTextHtml={keyTextHtml}>
          {title}
        </SpecialHeader>
        <HugeContainer
          sx={{
            paddingTop: { xs: "160px", sm: "100px", md: "90px" },
            mb: "10px",
            background: "linear-gradient(180deg, #DFE7EB 1%, transparent 99%)",
          }}
          rightSidebar={
            navigation &&
            navigation.nearestSiblings && (
              <NavSidebar title="Навигация" list={navigation.nearestSiblings} />
            )
          }
        >
          <Box
            component={"nav"}
            itemScope
            itemType="https://schema.org/SiteNavigationElement"
            sx={{ width: "100%", mb: 1 }}
          >
            <Stack
              component="ul"
              itemScope
              itemType="https://schema.org/ItemList"
              direction={"row"}
              alignContent="center"
              justifyContent="space-between"
              justifyItems={"center"}
              alignItems="center"
              mb={2}
              sx={{
                listStyleType: "none",
                m: 0,
                p: 0,
                "& a[href]": {
                  "&, & > span": {
                    display: "block",
                    borderRadius: "100%",
                  },
                },
              }}
            >
              <li itemProp="itemListElement">
                {navigation?.prev?.url ? (
                  <Link href={navigation.prev.url} itemProp="url">
                    <Tooltip
                      title={<>{navigation.prev.title}</>}
                      placement="right"
                      itemProp="name"
                    >
                      <StyledFab size="medium" aria-label="Предыдущая страница">
                        <ArrowBackIosRoundedIcon />
                      </StyledFab>
                    </Tooltip>
                  </Link>
                ) : (
                  <div></div>
                )}
              </li>
              <li>
                <CallButton zIndex={2} />
              </li>
              <li itemProp="itemListElement">
                {navigation?.next?.url ? (
                  <Link href={navigation.next.url} itemProp="url">
                    <Tooltip
                      title={<>{navigation.next.title}</>}
                      placement="left"
                      itemProp="name"
                    >
                      <StyledFab size="medium" aria-label="Следующая страница">
                        <ArrowForwardIosRoundedIcon />
                      </StyledFab>
                    </Tooltip>
                  </Link>
                ) : (
                  <div></div>
                )}
              </li>
            </Stack>
          </Box>
          <Paper
            sx={{
              "&, & p, & .Paper-root": {
                fontFamily: 'Roboto, "Segoe UI", Tahoma, Verdana, Arial',
                fontWeight: 500,
                fontSize: "18px",
                lineHeight: "27px",
                color: (theme) =>
                  theme.palette.mode === "light" ? "#0e0e0f" : "white",
              },
              "& .Paper-elevation1": {
                fontSize: "17px",
                lineHeight: "25px",
                marginBottom: "2rem",
                boxShadow: "4px 4px 20px rgba(0, 0, 0, 0.2)",
                borderRadius: 1,
              },
              "& .data-image-container": {
                textAlign: "center",
                my: 2,
                "& img": {
                  padding: 0,
                  margin: 0,
                  maxWidth: "100%",
                  objectFit: "contain",
                },
                "& .data-image-title": {
                  textAlign: "center",
                  color: "grey",
                  fontWeight: 300,
                },
              },
              "& img": {
                my: 1,
                mx: 0,
                boxShadow: "4px 4px 20px rgb(0 0 0 / 20%)",
                borderRadius: "24px",
                width: { xs: "100%", sm: "auto" },
                height: "auto",
                maxHeight: { xs: "inherit", sm: "60vh" },
                maxWidth: "100%",
                objectFit: "contain",
              },
              "& .firstImage": {
                my: 0,
                height: "auto",
                maxHeight: "inherit",
                float: { xs: "none", md: "right" },
                boxShadow: "none",
              },
              "& a.firstImage": {
                margin: { xs: 0, md: "0 0 10px 25px" },
                width: {
                  xs: "100%",
                  md: "480px",
                  lg: "48%",
                },
              },
              "& img.firstImage": {
                borderRadius: 0.8,
                boxShadow: "none",
                height: "auto",
                maxHeight: "inherit",
                width: {
                  xs: "100%",
                  md: "480px",
                  lg: "100%",
                },
                objectFit: "contain",
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
            <ArticleBreadcrumbs title={title} url={url} />

            {imgSrc && (
              <Link
                className={"firstImage"}
                itemProp="image"
                href={imgSrc}
                target={"_blank"}
              >
                <Image
                  src={imgSrc}
                  width={480}
                  height={480}
                  alt={`Балашиха Нужен мастер для ремонта ${h2 || title}`}
                  className={"firstImage"}
                />
              </Link>
            )}
            <Typography
              variant="h2"
              component="h2"
              itemProp="description"
              sx={{
                color: grey[600],
                fontSize: "26px",
                fontWeight: 600,
                mt: 0,
                mb: "20px",
              }}
            >
              {h2 || title}
            </Typography>
            <section itemProp="articleBody">
              <DescriptionParser descriptionHTML={renderHtml} />
            </section>
            <NavigationButtons navigation={navigation} />
            <CallMeForFree
              sx={{
                p: 0,
              }}
            />
          </Paper>
        </HugeContainer>
      </Box>
    </>
  );
}
