import { Container, Grid, Card, Paper } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import util from "util";
import { Layout } from "@components/site";
import CardGridContainer from "@components/site/LandingPage/CardGridContainer";
import LandingReasons from "@components/site/LandingPage/LandingReasons";
import LandingPricesCards from "@components/site/LandingPage/LandingPricesCards";
import getArticleByAbsUrl from "@framework/article/get-article-by-abs-url";
import { EnhImage } from "@components/ui";
import { CallMeForFree } from "@components/site/LandingPage";
import useCountViews from "@framework/site/use-count-views";
import React, { useEffect, useRef } from "react";
import { getCanonicalUrl } from "@framework/utils/normalize";
import { DescriptionParser } from "@components/common/BlogArticle";

export default function AboutMaster(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { article } = props;
  if (!article || !article.renderHtml) {
    throw new Error("No article for this page!");
  }
  const { renderHtml, title, image } = article;
  const countViews = useCountViews();
  const countViewsRef = useRef(countViews);
  useEffect(() => {
    countViewsRef.current = countViews;
  }, [countViews]);
  useEffect(() => {
    if (article.id) {
      const countViews = countViewsRef.current;
      countViews({ articleId: article.id });
    }
  }, [article.id]);
  return (
    <>
      <Head>
        <link rel="canonical" href={article.canonicalUrl} />
        <title>{`${title} Мастер в Балашихе из МГТУ МИРЭА закажите ремонт компьютера сегодня`}</title>
        <meta
          name="description"
          content={`Мастер в Балашихе из МГТУ МИРЭА ${title} закажите ремонт компьютера сегодня`}
        />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content={article.canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:image" content={image?.canonicalUrl || ""} />
        <meta
          property="og:image:width"
          content={image?.width.toString() || ""}
        />
        <meta
          property="og:image:height"
          content={image?.height.toString() || ""}
        />
      </Head>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography
          component="h1"
          variant="h1"
          mb={2}
          pb={0}
          color={(theme) => theme.palette.text.primary}
          sx={{
            textAlign: "right",
            fontSize: { xs: "25px", md: "40px" },
            lineHeight: { xs: "35px", md: "52px" },
          }}
        >
          Дмитрий,{" "}
          <Box component="strong" color="primary.main">
            {" "}
            компьютерный мастер в Балашихе
          </Box>
          ,{" "}
          <Box component="br" sx={{ display: { xs: "none", md: "inline" } }} />
          <Box component="strong" color="primary.main">
            МГТУ МИРЭА
          </Box>
          , Российский
          <Box
            component="br"
            sx={{ display: { xs: "none", md: "inline" } }}
          />{" "}
          Технологический Университет
        </Typography>
        <Grid container sx={{ mb: "26px" }}>
          {image && (
            <Grid
              item
              xs={12}
              md={4}
              lg={3.7}
              sx={{
                zIndex: 0,
                display: "flex",
                alignItems: "flex-start",
                justifyContent: { xs: "center", md: "flex-end" },
              }}
            >
              <Paper
                elevation={1}
                sx={{
                  p: 0.7,
                  pb: 0.1,
                  marginBottom: { xs: "15px", md: 0 },
                  marginTop: { md: "60px" },
                  marginRight: { md: "-26px" },
                  borderRadius: (theme) => theme.shape.borderRadius - 5 + "px",
                  "& img": {
                    borderRadius: (theme) =>
                      theme.shape.borderRadius - 10 + "px",
                    width: { xs: "460px", md: "inherit" },
                    height: "auto",
                  },
                }}
              >
                <EnhImage
                  src={image.url}
                  width={image.width}
                  height={image.height}
                  alt={image.alt}
                  fitWidth={340}
                  quality={95}
                ></EnhImage>
              </Paper>
            </Grid>
          )}
          <Grid item xs={12} md={8} lg={8.3}>
            <Paper
              sx={{
                border: "12px solid",
                borderColor: (theme) => theme.palette.background.paper,
                borderRadius: (theme) => theme.shape.borderRadius - 5 + "px",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  border: "3px solid",
                  borderColor: (theme) => theme.palette.primary.light,
                  borderRadius: (theme) => theme.shape.borderRadius - 9 + "px",
                  p: { xs: 1, md: 2 },
                  pl: { md: 2.5 },
                  pr: 1,
                  fontFamily: `Roboto, "Segoe UI", Tahoma, Verdana, Arial`,
                  fontWeight: 500,
                  fontSize: "18px",
                  lineHeight: "28px",
                  color: (theme) =>
                    theme.palette.mode === "light" ? "#04040a" : "white",
                }}
              >
                <DescriptionParser descriptionHTML={renderHtml} />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <CallMeForFree elevation={8} sx={{ my: "38px" }} />
      <CardGridContainer />
      <LandingReasons />
      <LandingPricesCards />
    </>
  );
}
AboutMaster.Layout = Layout;

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const article = await getArticleByAbsUrl({
    absURL: "/computer-master-balashiha",
  });
  const imageUrl = `/images/about/computer_master_photo_balashikha.webp`;
  if (article) {
    article.image = {
      ...article.image,
      url: imageUrl,
      canonicalUrl: getCanonicalUrl({ url: imageUrl }),
      width: 1766,
      height: 2829,
      alt: `Дмитрий, компьютерный мастер в Балашихе, выпускник МГТУ МИРЭА (РТУ МИРЭА)`,
      orderNumber: null,
      originalWidth: null,
      originalHeight: null,
      createdAt: null,
      updatedAt: null,
      imageId: `/images/about/computer_master_photo_balashikha.webp`,
    };
  }
  return {
    props: { article },
  };
};
