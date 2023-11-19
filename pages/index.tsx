import { Container, Grid, Card, Paper, ThemeProvider } from "@mui/material";
import Head from "next/head";
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
import { CallMeForFree, HeroAlt } from "@components/site/LandingPage";
import LandingServices from "@components/site/LandingPage/LandingServices";
import LandingClientSteps from "@components/site/LandingPage/LandingClientSteps";
import LandingAgeTasks from "@components/site/LandingPage/LandingAgeTasks";
import LandingWizard from "@components/site/LandingPage/LandingWizard";
import { getCanonicalUrl, makeImageType } from "@framework/utils/normalize";
import { BottomContactsWithMap } from "@components/site/LandingPage/BottomContactsWithMap";
import { useThemePalette } from "@components/ui";
import getDarkTheme from "@components/ui/theme/dark-theme";
import LandingPhotoTicker from "@components/site/LandingPage/LandingPhotoTicker";

export default function Home(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { theme } = useThemePalette(getDarkTheme);
  const { article } = props;
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container
          itemScope
          itemType="https://schema.org/Product"
          maxWidth={false}
          sx={{
            backgroundColor: "#010101",
            "&&": {
              px: { xs: 0, sm: 0, md: 0, lg: 0, xl: 0 },
            },
          }}
        >
          <HeroAlt article={article!} />
          <LandingServices></LandingServices>
          <LandingClientSteps />
          <LandingAgeTasks />
          <LandingWizard />
          <LandingPhotoTicker />
          <CardGridContainer />
          <LandingReasons />
          <LandingPricesCards />
          <CallMeForFree elevation={8} sx={{ mb: "20px" }} />
          <BottomContactsWithMap />
        </Container>
      </ThemeProvider>
    </>
  );
}
Home.Layout = Layout;

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const article = await getArticleByAbsUrl({
    absURL: "/",
  });

  const imageUrl = `/images/computer_master_balashikha_hero.webp`;
  if (article) {
    article.image = {
      ...article.image,
      ...makeImageType({
        url: imageUrl,
        width: 600,
        height: 392,
        alt: `Дмитрий, компьютерный мастер в Балашихе, выпускник МГТУ МИРЭА (РТУ МИРЭА)`,
      }),
    };
  }
  return {
    props: { article },
  };
};
