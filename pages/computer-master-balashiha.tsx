import { BottomContactsWithMap } from "@components/site/LandingPage/BottomContactsWithMap";
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
import CardGridContainer from "@components/site/LandingPage/LandingPictureCardGridContainer";
import LandingReasons from "@components/site/LandingPage/LandingReasons";
import LandingPricesCards from "@components/site/LandingPage/LandingPricesCards";
import getArticleByAbsUrl from "@framework/article/get-article-by-abs-url";
import { EnhImage } from "@components/ui";
import { CallMeForFree } from "@components/site/LandingPage";
import useCountViews from "@framework/site/use-count-views";
import React, { useEffect, useRef } from "react";
import { getCanonicalUrl, makeImageType } from "@framework/utils/normalize";
import { DescriptionParser } from "@components/common/BlogArticle";
import Link from "next/link";
import BlogListBreadcrumbs from "@components/site/BlogList/BlogListBreadcrumbs";

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
          content={
            "Мастер в Балашихе - выпускник РТУ МИРЭА (Российский Технологический Университет)"
          }
        />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content={article.canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta
          property="og:description"
          content={
            "Мастер в Балашихе - выпускник РТУ МИРЭА (Российский Технологический Университет)"
          }
        />
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
      <Container
        maxWidth="lg"
        sx={{ mt: 4 }}
        itemScope
        itemType="https://schema.org/Person"
      >
        <Typography
          component="h1"
          variant="h1"
          mb={2}
          pb={0}
          sx={{
            px: { xs: 3, md: 0 },
            textAlign: "right",
            fontSize: { xs: "20px", md: "30px" },
            lineHeight: { xs: "35px", md: "40px" },
          }}
          itemProp="name"
        >
          {article.title}
        </Typography>
        <Grid container sx={{ mb: "26px" }}>
          <Grid item xs={12}>
            <Paper
              sx={{
                p: { xs: 0, sm: "12px" },
                borderRadius: (theme) => theme.shape.borderRadius - 5 + "px",
              }}
              itemProp="description"
            >
              <Box
                sx={{
                  p: { xs: 1.5, sm: 2 },
                  width: "100%",
                  border: "3px solid",
                  overflow: "visible",
                  borderColor: (theme) => theme.palette.primary.light,
                  borderRadius: (theme) => theme.shape.borderRadius - 9 + "px",
                  fontFamily: "var(--text-font-family)",
                  fontWeight: 500,
                  fontSize: { xs: "18px", sm: "16px", md: "18px" },
                  lineHeight: { xs: "28px", sm: "23px", md: "28px" },
                  color: (theme) =>
                    theme.palette.mode === "light" ? "#04040a" : "white",
                  "& .main-image": {
                    p: 0,
                    ml: { xs: 0, sm: -6 },
                    mt: { xs: 0, sm: -5 },
                    mr: { xs: 0, sm: 2.5, lg: 3.2 },
                    mb: 2,
                    float: { xs: "none", sm: "left" },
                    display: "block",
                    "& img": {
                      p: 0,
                      m: 0,
                      borderRadius: (theme) =>
                        theme.shape.borderRadius - 6 + "px",
                      width: {
                        xs: "100%",
                        sm: "300px",
                        lg: "400px",
                        xl: "460px",
                      },
                      height: "auto",
                      boxShadow: `0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12), -2px 9px 10px 1px rgba(0,0,0,0.52)`,
                    },
                  },
                }}
              >
                {image && (
                  <Link
                    itemProp="image"
                    href={image.canonicalUrl}
                    target="_blank"
                    className="main-image"
                  >
                    <EnhImage
                      src={image.url}
                      width={image.width}
                      height={image.height}
                      alt={image.alt}
                      fitWidth={600}
                      quality={90}
                    ></EnhImage>
                  </Link>
                )}
                <meta
                  itemProp="alumniOf"
                  content="РТУ МИРЭА (Российский Технологический Университет)"
                />
                <DescriptionParser descriptionHTML={renderHtml} />
                <BlogListBreadcrumbs />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <CallMeForFree elevation={8} sx={{ mt: "3px", mb: "38px" }} />
      <CardGridContainer />
      <LandingReasons />
      <LandingPricesCards />
      <BottomContactsWithMap />
    </>
  );
}
AboutMaster.Layout = Layout;

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const article = await getArticleByAbsUrl({
    absURL: "/computer-master-balashiha",
  });
  const imageUrl = `/images/about/computer_master_photo_balashikha.jpg`;
  if (article) {
    article.image = {
      ...article.image,
      ...makeImageType({
        url: imageUrl,
        width: 1504,
        height: 2057,
        alt: `Дмитрий, компьютерный мастер в Балашихе, выпускник МГТУ МИРЭА (РТУ МИРЭА)`,
      }),
    };
  }
  return {
    props: { article },
  };
};
