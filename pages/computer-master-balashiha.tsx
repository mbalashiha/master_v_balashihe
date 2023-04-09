import { ArticleLayout } from "@components/site";
import { Container, Grid, Card, Paper } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Article, DescriptionParser } from "@components/common/Article";
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
import React from "react";

export default function AboutMaster(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { article } = props;
  if (!article || !article.renderHtml) {
    throw new Error("No article for this page!");
  }
  const { renderHtml, title } = article;
  return (
    <>
      <Head>
        <title>{`Мастер в Балашихе ${title} закажите ремонт компьютера сегодня`}</title>
        <meta
          name="description"
          content={`Мастер в Балашихе ${title} закажите ремонт компьютера сегодня`}
        />
      </Head>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography
          component="h1"
          variant="h1"
          mb={0}
          pb={0}
          color={(theme) => theme.palette.text.primary}
        >
          Дмитрий,{" "}
          <Box component="strong" color="primary.main">
            {" "}
            компьютерный мастер в Балашихе
          </Box>
          , <br />
          <Box component="strong" color="primary.main">
            МГТУ МИРЭА
          </Box>
          , Российский Технологический Университет
        </Typography>
        <Grid container sx={{}}>
          <Grid
            item
            xs={12}
            md={3.5}
            sx={{
              zIndex: 0,
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <Paper
              elevation={4}
              sx={{
                p: 1,
                marginBottom: { xs: "15px", md: 0 },
                minHeight: "440px",
                width: "348px",
                marginTop: { md: "43px" },
                borderRadius: (theme) => theme.shape.borderRadius - 5 + "px",
              }}
            ></Paper>
          </Grid>
          <Grid item xs={12} md={8.5} sx={{ zIndex: -1 }}>
            <Paper
              sx={{
                p: 3,
                width: "100%",
                fontFamily: `Roboto, "Segoe UI", Tahoma, Verdana, Arial`,
                fontWeight: 500,
                fontSize: "18px",
                lineHeight: "28px",
                color: (theme) =>
                  theme.palette.mode === "light" ? "#04040a" : "white",
              }}
            >
              <DescriptionParser descriptionHTML={renderHtml} />
            </Paper>
          </Grid>
        </Grid>
      </Container>

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
  return {
    props: { article },
  };
};
