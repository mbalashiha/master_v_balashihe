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
import NavigationButtons from "./NavigationButtons/NavigationButtons";
import { CallMeForFree } from "@components/site/LandingPage";
import useCountViews from "@framework/site/use-count-views";
import { useEffect, useRef } from "react";
import { grey } from "@mui/material/colors";
import Image from "next/image";
import { ArticleBreadcrumbs } from "./ArticleBreadcrumbs";
import Head from "next/head";

interface Props extends CMS.Blog.Article {}

export default function BlogArticle({
  title,
  image,
  navigation,
  keyTextHtml,
  renderHtml,
  id,
  h2,
  secondImage,
  randomImage,
  url,
  canonicalUrl,
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
      </Head>
      <HugeContainer>
        <ArticleBreadcrumbs title={title} url={url} />
        <Box
          component={"article"}
          width="100%"
          itemScope
          itemType="https://schema.org/Article"
        >
          <Typography
            component="h1"
            variant="h1"
            itemProp="headline"
            sx={{
              fontSize: { xs: "28px" },
              lineHeight: { xs: "35px" },
              fontWeight: 700,
              mt: "5px",
              mb: "15px",
            }}
          >
            {title}
          </Typography>
          <Paper
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
              "& img, & .Paper-elevation1": {
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
              },
              "& .firstImage": {
                my: 0,
                width: {
                  xs: "100%",
                  md: "480px",
                },
                height: "auto",
                float: "left",
                boxShadow: "none",
              },
              "& div.firstImage": {
                margin: { xs: "0 28px 20px 0", md: "0 28px 10px 0" },
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
            {imgSrc && (
              <div
                className={"firstImage"}
                itemProp="image"
                itemScope
                itemType="https://schema.org/ImageObject"
              >
                <meta itemProp="image" content={imgSrc} />
                <Image
                  itemProp="contentUrl"
                  src={imgSrc}
                  width={480}
                  height={480}
                  alt={`Балашиха Нужен мастер для ремонта ${h2 || title}`}
                  className={"firstImage"}
                />
              </div>
            )}
            {keyTextHtml && (
              <Grid
                item
                xs={12}
                order={2}
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
              </Grid>
            )}
            <section itemProp="articleBody">
              <DescriptionParser descriptionHTML={renderHtml} />
            </section>
            <CallMeForFree
              sx={{
                p: 0,
              }}
            />
          </Paper>
          <NavigationButtons navigation={navigation} />
        </Box>
      </HugeContainer>
    </>
  );
}
