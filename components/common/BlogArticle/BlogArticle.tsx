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
import { useEffect, useRef, useState } from "react";
import { blueGrey, grey } from "@mui/material/colors";
import Image from "next/image";
import { ArticleBreadcrumbs } from "./ArticleBreadcrumbs";
import Head from "next/head";
import NavigationButtons from "../ContactArticle/NavigationButtons/NavigationButtons";
import IconView from "./IconView";

interface Props extends CMS.Blog.Article {}

export default function BlogArticle(article: Props) {
  const {
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
  } = article;
  const articleImage =
    secondImage && secondImage?.canonicalUrl
      ? secondImage
      : inImage && inImage?.canonicalUrl
      ? inImage
      : randomImage;
  const imgSrc = articleImage?.canonicalUrl;
  const [viewed, setViewed] = useState<number>(article.viewed || 0);
  const countViews = useCountViews();
  const countViewsRef = useRef(countViews);
  useEffect(() => {
    countViewsRef.current = countViews;
  }, [countViews]);
  useEffect(() => {
    if (id) {
      const countViews = countViewsRef.current;
      countViews({ articleId: id }).then((data) => setViewed(data.viewed));
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
            marginBottom: "1.5rem",
            "&, & p, & .Paper-root": {
              fontFamily: "var(--article-text-font-family)",
              fontWeight: 400,
              fontSize: "18px",
              lineHeight: "28px",
              color: (theme) => theme.palette.articleText?.main || "black",
              "& a": {
                fontWeight: 600,
              },
            },
            "& p": {
              // p: 0,
              m: `15px 0 3px 0`,
            },
            "& .Paper-root": {
              clear: "both",
              fontFamily: `var(--text-font-family)`,
              "& strong": {
                fontFamily: `var(--text-font-family)`,
              },
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
              fontFamily: `var(--text-font-family)`,
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
                sm: "50%",
                md: "48%",
              },
            },
            "& img.firstImage": {
              borderRadius: 0.8,
              boxShadow: "none",
              height: "auto",
              maxHeight: "inherit",
              width: "100%",
              objectFit: "contain",
            },
            "& h2:not(:first-of-type)": {
              color: (theme) =>
                theme.palette.mode === "light" ? grey[600] : grey[400],
              fontSize: "21px",
              lineHeight: "26px",
              fontWeight: 500,
              my: "1.5rem",
            },
            "& h3": {
              color: (theme) =>
                theme.palette.mode === "light" ? grey[800] : grey[200],
              mb: "0.5rem",
              mt: "1.1rem",
              fontWeight: 700,
            },
            "& h4": {
              color: (theme) =>
                theme.palette.mode === "light" ? grey[900] : grey[100],
              my: "0.7rem",
            },
          }}
        >
          <link itemProp="mainEntityOfPage" href={canonicalUrl} />
          <meta itemProp="datePublished" content={datePublished} />
          <meta itemProp="dateModified" content={dateModified} />
          {articleImage?.canonicalUrl && (
            <meta itemProp="image" content={articleImage?.canonicalUrl} />
          )}
          <Typography
            component="h1"
            variant="h1"
            itemProp="headline"
            sx={{
              mx: { xs: "10px", sm: "10px", md: 0 },
              my: 2,
              padding: 0,
              float: "none",
              clear: "both",
              fontSize: "32px",
              lineHeight: "35px",
              fontWeight: 700,
              minHeight: "41px",
              maxHeight: 35 * 3 + "px",
              overflow: "hidden",
              display: "-webkit-box",
              lineClamp: "3",
              boxOrient: "vertical",
              textOverflow: "ellipsis",
              // textAlign: { xs: "center", sm: "left" },
            }}
          >
            {title}
          </Typography>
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
                loading="eager"
              />
            </Link>
          )}
          {keyTextHtml && (
            <Box
              sx={{
                p: { xs: "10px 0", md: `5px 0 30px 0` },
                clear: "left",
                "& > p": {
                  fontWeight: 400,
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
          <Stack
            width={{ xs: "100%", md: "auto", lg: "auto" }}
            direction={"row"}
            alignItems={"flex-start"}
            flexWrap="wrap"
            spacing={0}
            sx={{
              gap: { xs: 2, sm: 2, lg: 3 },
              pt: { xs: "10px", sm: "10px", md: 0 },
              pb: 0,
            }}
          >
            <IconView
              iconContent={`"\\e8b5"`}
              title="Время на чтение"
              message={article.readingTime.toString()}
              popoverTitle={article.readingTime.toString()}
            />
            <IconView
              iconContent={`"\\ebcc"`}
              title="Дата публикации"
              message={article.humanDates.datePublished}
              popoverTitle={article.humanDates.datePublished}
            />
            <IconView
              itemProp="aggregateRating"
              itemScope
              itemType="https://schema.org/AggregateRating"
              iconContent={`"\\e8f4"`}
              title="Просмотры"
              message={
                <>
                  <meta itemProp="bestRating" content="5" />
                  <meta
                    itemProp="ratingValue"
                    content={viewed < 100 ? "3.5" : viewed < 500 ? "4" : "5"}
                  />
                  <Box
                    component="span"
                    itemProp="ratingCount"
                    sx={{
                      overflow: "hidden",
                      display: "block",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      maxWidth: {
                        xs: "120px",
                        sm: "180px",
                        md: "360px",
                        lg: "100px",
                      },
                    }}
                  >
                    {viewed || "Ooops!!!"}
                  </Box>
                </>
              }
              popoverTitle={`${viewed || "Ooops!!!"} просмотров`}
            />
          </Stack>
          <Box
            sx={{ clear: "left" }}
            component="section"
            itemProp="articleBody"
          >
            <DescriptionParser descriptionHTML={renderHtml} />
          </Box>
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
