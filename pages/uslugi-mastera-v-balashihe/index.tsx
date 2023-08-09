import { CardsLayout } from "@components/site";
import { Typography, Card, Grid, Button, Box } from "@mui/material";
import Head from "next/head";
import { InferGetStaticPropsType } from "next/types";
import { HugeContainer } from "@components/ui";
import getArticlesCards from "@framework/article/get-articles-cards";
import getRecentArticles from "@framework/article/get-recent-articles";
import { ArticleCard } from "@components/common/Article";
import { SidebarPaper } from "@components/common/Sidebar";
import { BlogRootSidebar } from "@components/common/Article/Sidebars";

export default function Page({
  articles,
  recentArticles,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Мастер в Балашихе - все услуги по ремонту</title>
        <meta
          name="description"
          content="Ремонт материнских плат в Балашихе и Московской области"
        />
      </Head>
      <HugeContainer
        leftSidebar={<BlogRootSidebar recentArticles={recentArticles} />}
        sx={{ background: "transparent" }}
      >
        <h1>Услуги мастера в Балашихе РФ по ремонту ПК</h1>
        <Grid container spacing={{ xs: 2, lg: 3 }}>
          {articles.map((article) => (
            <ArticleCard key={article.url} article={article} />
          ))}
        </Grid>
      </HugeContainer>
    </>
  );
}
Page.Layout = CardsLayout;
export async function getStaticProps() {
  return {
    props: {
      articles: await getArticlesCards(),
      recentArticles: await getRecentArticles(),
    },
  };
}
