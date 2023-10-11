import { CardsLayout, Search } from "@components/site";
import { Typography, Card, Grid, Button, Box } from "@mui/material";
import Head from "next/head";
import {
  InferGetServerSidePropsType,
  GetServerSidePropsContext,
} from "next/types";
import { HugeContainer } from "@components/ui";
import getArticlesCards from "@framework/article/get-articles-cards";
import { ArticleCard } from "@components/common/ContactArticle";
import { SearchPageLayout } from "@components/site/Layout";
import getRecentArticles from "@framework/article/get-recent-articles";
import { BlogRootSidebar } from "@components/common/BlogArticle/Sidebars";

export default function SearchPage({
  search,
  articles,
  recentArticles,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>{`Страница поиска - Мастер в Балашихе`}</title>
        <meta
          name="description"
          content={`Страница поиска - Мастер в Балашихе`}
        />
      </Head>
      <HugeContainer
        leftSidebar={<BlogRootSidebar recentArticles={recentArticles} />}
      >
        <Search search={search} sx={{ mb: 4 }} />
        {articles.length ? (
          <Grid container spacing={{ xs: 2, lg: 3 }}>
            {articles.map((article) => (
              <ArticleCard key={article.url} article={article} />
            ))}
          </Grid>
        ) : (
          <Typography component="h1" variant="h1">
            Ничего не найдено
          </Typography>
        )}
      </HugeContainer>
    </>
  );
}
SearchPage.Layout = SearchPageLayout;
export async function getServerSideProps(
  context: GetServerSidePropsContext<{ search: string }>
) {
  const search = decodeURIComponent(context.params?.search || "");
  return {
    props: {
      search,
      articles: await getArticlesCards({ search }),
      recentArticles: await getRecentArticles(),
    },
  };
}
