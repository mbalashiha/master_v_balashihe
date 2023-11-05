import { BottomContactsWithMap } from "@components/site/LandingPage/BottomContactsWithMap";
import { CardsLayout } from "@components/site";
import { Typography, Card, Grid, Button, Box } from "@mui/material";
import Head from "next/head";
import { InferGetStaticPropsType } from "next/types";
import { HugeContainer } from "@components/ui";
import getArticlesCards from "@framework/article/get-articles-cards";
import getRecentArticles from "@framework/article/get-recent-articles";
import { ArticleCard } from "@components/common/ContactArticle";
import { BlogRootSidebar } from "@components/common/BlogArticle/Sidebars";
import { getCanonicalUrl } from "@framework/utils/normalize";
import { CMS } from "@common/types";
import BlogListBreadcrumbs from "@components/site/BlogList/BlogListBreadcrumbs";

export default function Page({
  articles,
  recentArticles,
  title,
  canonicalUrl,
  image,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <link rel="canonical" href={canonicalUrl} />
        <title>{title}</title>
        <meta
          name="description"
          content={`Мастер в Балашихе, ${title}, МГТУ МИРЭА закажите ремонт компьютера сегодня`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta
          property="og:description"
          content={`Мастер в Балашихе, ${title}, МГТУ МИРЭА закажите ремонт компьютера сегодня`}
        />
        <meta property="og:image" content={image.canonicalUrl || ""} />
        <meta
          property="og:image:width"
          content={image.width.toString() || ""}
        />
        <meta
          property="og:image:height"
          content={image.height.toString() || ""}
        />
      </Head>
      <HugeContainer
        itemScope
        itemType="https://schema.org/Blog"
        leftSidebar={<BlogRootSidebar recentArticles={recentArticles} />}
        sx={{ background: "transparent" }}
      >
        <BlogListBreadcrumbs />
        <Typography
          itemProp="description"
          variant="h3"
          component="h3"
          sx={{ mb: 2 }}
        >
          {title}
        </Typography>
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
  const imageRelativePath =
    "/images/logo-master-v-balashihe-rf-screwdriver.png";
  const image: CMS.Image = {
    url: imageRelativePath,
    alt: "",
    canonicalUrl: getCanonicalUrl({ url: imageRelativePath }),
    height: 380,
    width: 380,
  };
  return {
    props: {
      title: `Блог мастера в Балашихе РФ по ремонту ПК`,
      canonicalUrl: getCanonicalUrl({ url: `/uslugi-mastera-v-balashihe/` }),
      image,
      articles: await getArticlesCards(),
      recentArticles: await getRecentArticles(),
    },
  };
}
