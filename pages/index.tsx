import { Container, Grid, Card, Paper } from "@mui/material";
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
import { getCanonicalUrl } from "@framework/utils/normalize";

export default function Home(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { article } = props;
  return (
    <>
      <HeroAlt article={article!} />
      <LandingServices></LandingServices>
      <LandingClientSteps />
      <LandingAgeTasks />
      <LandingWizard />
      <CardGridContainer />
      <LandingReasons />
      <LandingPricesCards />
      <CallMeForFree elevation={8} sx={{ mb: "20px" }} />
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
      url: imageUrl,
      canonicalUrl: getCanonicalUrl({ url: imageUrl }),
      width: 600,
      height: 392,
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
