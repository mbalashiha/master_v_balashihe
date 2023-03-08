import { CardsLayout } from "@components/site";
import { Typography, Card, Grid, Button, Box } from "@mui/material";
import Head from "next/head";
import { InferGetStaticPropsType } from "next/types";
import { HugeContainer } from "@components/ui";
import getArticlesCards from "@framework/article/get-articles-cards";
import { ArticleCard } from "@components/common/Article";

export default function Page(
  { articles }: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <>
      <Head>
        <title>Мастер в Балашихе</title>
        <meta
          name="description"
          content="Ремонт материнских плат в Балашихе и Московской области"
        />
      </Head>
      <HugeContainer
        leftSidebar={
          <Card elevation={0} sx={{ width: "100%", height: "800px" }}></Card>
        }
      >
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
    },
  };
}