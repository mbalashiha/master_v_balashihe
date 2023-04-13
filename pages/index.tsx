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
import { Hero } from "@components/site/LandingPage";

export default function Home(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { article } = props;
  return (
    <>
      <Head>
        <title>Мастер в Балашихе - Закажите ремонт компьютера сегодня</title>
        <meta
          name="description"
          content="Мастер в Балашихе - Закажите ремонт компьютера сегодня"
        />
      </Head>
      <Hero article={article!} />
      <CardGridContainer />
      <LandingReasons />
      <LandingPricesCards />
    </>
  );
}
Home.Layout = Layout;

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const article = await getArticleByAbsUrl({
    absURL: "/",
  });
  if (article) {
    article.image = {
      ...article.image,
      url: `/images/computer_master_photo_balashikha.webp`,
      width: 2301,
      height: 3071,
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
