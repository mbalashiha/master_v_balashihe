import { BottomContactsWithMap } from "@components/site/LandingPage/BottomContactsWithMap";
import { CardsLayout } from "@components/site";
import {
  Typography,
  Card,
  Grid,
  Button,
  Box,
  Paper,
  Stack,
} from "@mui/material";
import Head from "next/head";
import { InferGetStaticPropsType } from "next/types";
import { HugeContainer } from "@components/ui";
import getArticlesCards from "@framework/article/get-articles-cards";
import getRecentArticles from "@framework/article/get-recent-articles";
import { ArticleCard } from "@components/common/ContactArticle";
import { BlogRootSidebar } from "@components/common/BlogArticle/Sidebars";
import { getCanonicalUrl, makeImageType } from "@framework/utils/normalize";
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
        sx={{ background: "white" }}
        header={
          <Stack
            direction="row"
            flexWrap="wrap-reverse"
            alignItems="center"
            spacing={0}
            sx={{
              my: 1,
              gap: { xs: "5px", sm: 1, md: 2 },
            }}
          >
            <Box>
              <Typography
                itemProp="description"
                variant="h3"
                component="h3"
                sx={{
                  fontSize: "21px",
                  lineHeight: "28px",
                  fontWeight: 500,
                }}
              >
                {title}
              </Typography>
            </Box>
            <Box>
              <BlogListBreadcrumbs />
            </Box>
          </Stack>
        }
      >
        <Box sx={{ height: { xs: "", md: "45px" } }}></Box>
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
  const image: CMS.Image = makeImageType({
    url: imageRelativePath,
    height: 380,
    width: 380,
  });
  return {
    props: {
      title: `Блог мастера в Балашихе РФ по ремонту ПК`,
      canonicalUrl: getCanonicalUrl(`/uslugi-mastera-v-balashihe/`),
      image,
      articles: await getArticlesCards(),
      recentArticles: await getRecentArticles(),
    },
  };
}
