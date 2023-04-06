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

export default function Home(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <>
      <Head>
        <title>Мастер в Балашихе - Закажите ремонт компьютера сегодня</title>
        <meta
          name="description"
          content="Мастер в Балашихе - Закажите ремонт компьютера сегодня"
        />
      </Head>
      <CardGridContainer />
      <LandingReasons />
      <LandingPricesCards />
    </>
  );
}
Home.Layout = Layout;

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const article = await getArticleByAbsUrl({ absURL: "/" });
  return {
    props: { article },
  };
};
