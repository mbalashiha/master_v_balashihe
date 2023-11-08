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
import DescriptionParser from "./DescriptionParser";
import { HugeContainer, Tooltip } from "@components/ui";
import { CMS } from "@common/types";
import { HeaderTextParser } from "@components/common/HeaderTextParser";
import { CallMeForFree } from "@components/site/LandingPage";
import useCountViews from "@framework/site/use-count-views";
import { useEffect, useRef } from "react";
import { grey } from "@mui/material/colors";
import Image from "next/image";
import { ArticleBreadcrumbs } from "./ArticleBreadcrumbs";
import Head from "next/head";
import NavigationButtons from "../ContactArticle/NavigationButtons/NavigationButtons";
import { BottomContactsWithMap } from "@components/site/LandingPage/BottomContactsWithMap";

interface Props extends CMS.Blog.Article {}

export default function BlogArticle({
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
    secondImage && secondImage?.url
      ? secondImage
      : inImage && inImage?.url
      ? inImage
      : randomImage;
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
      <HugeContainer>
        <ArticleBreadcrumbs title={title} url={url} />
        <Paper
          itemScope
          itemType="https://schema.org/BlogPosting"
          sx={{
            p: 0,
            boxShadow: "none",
            boxSizing: "border-box",
            overflow: "visible",
            "&, & p, & .Paper-root": {
              fontFamily: 'Roboto, "Segoe UI", Tahoma, Verdana, Arial',
              fontWeight: 500,
              fontSize: "18px",
              lineHeight: "27px",
              color: (theme) =>
                theme.palette.mode === "light" ? "#0e0e0f" : "white",
            },
            "& .Paper-root": {
              clear: "both",
            },
            "& .Paper-elevation1": {
              fontSize: "17px",
              lineHeight: "25px",
              marginBottom: "2rem",
              boxShadow: "4px 4px 20px rgba(0, 0, 0, 0.2)",
              borderRadius: 1,
            },
            "& img": {
              my: 1,
              mx: 0,
              maxWidth: "100%",
              height: "auto",
              borderRadius: 0.8,
            },
            "& .firstImage": {
              my: 0,
              height: "auto",
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
              width: {
                xs: "100%",
                md: "480px",
                lg: "100%",
              },
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
          }}
        >
          <link itemProp="mainEntityOfPage" href={canonicalUrl} />
          <meta itemProp="datePublished" content={datePublished} />
          <meta itemProp="dateModified" content={dateModified} />
          {articleImage?.canonicalUrl && (
            <meta itemProp="image" content={articleImage?.canonicalUrl} />
          )}
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
            component="h1"
            variant="h1"
            itemProp="headline"
            sx={{
              fontSize: { xs: "22px", md: "32px" },
              lineHeight: { xs: "30px", md: "40px" },
              fontWeight: 700,
              m: { xs: "15px", md: "0 0 20px 0" },
            }}
          >
            {title}
          </Typography>
          {keyTextHtml && (
            <Box
              sx={{
                paddingTop: 0,
                paddingBottom: "47px",
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
          )}
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
    </>
  );
}
