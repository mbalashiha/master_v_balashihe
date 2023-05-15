import { Container, Grid, Card, Paper } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DescriptionParser } from "@components/common/Article";
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
import { fitWidth } from "@lib/aspect-ration-fit";

export default function AboutMaster(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { article } = props;
  if (!article || !article.renderHtml) {
    throw new Error("No article for this page!");
  }
  let { renderHtml, title, image } = article;
  image = React.useMemo(() => {
    if (image && image.width) {
      const { width, height } = fitWidth(image.width, image.height, 340);
      image.width = width;
      image.height = height;
      return image;
    } else {
      return image;
    }
  }, [image]);
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
          mb={2}
          pb={0}
          color={(theme) => theme.palette.text.primary}
          sx={{ textAlign: "right" }}
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
          , Российский <br /> Технологический Университет
        </Typography>
        <Grid container>
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
                justifyContent: "flex-end",
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
                  },
                }}
              >
                <Image
                  src={image.url}
                  width={image.width}
                  height={image.height}
                  alt={image.alt}
                ></Image>
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
  if (article) {
    article.image = {
      ...article.image,
      url: `/images/computer_master_photo_balashikha.webp`,
      width: 716,
      height: 916,
      alt: `Дмитрий, компьютерный мастер в Балашихе, выпускник МГТУ МИРЭА (РТУ МИРЭА)`,
      orderNumber: null,
      originalWidth: null,
      originalHeight: null,
      createdAt: null,
      updatedAt: null,
      imageId: `/images/computer_master_photo_balashikha.webp`,
    };
  }
  return {
    props: { article },
  };
};
